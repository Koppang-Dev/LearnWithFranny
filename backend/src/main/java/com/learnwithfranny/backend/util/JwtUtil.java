package com.learnwithfranny.backend.util;

import com.learnwithfranny.backend.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.SignatureException; 
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

@Component
@Log4j2
public class JwtUtil {

    @Value("${LearnWithFranny.app.jwtSecret}")
    private String jwtSecret;

    @Value("${LearnWithFranny.app.jwtExpirationMs}")
    private int jwtExpirationMs;

     /**
     * Generates a JWT token for the authenticated user.
     * @param authentication The authentication object containing the user details.
     * @return The generated JWT token as a string.
     */
    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        // Use the Keys utility to generate a signing key from the secret
        Key signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .claim("sub", userPrincipal.getUsername()) // Set the subject using the "sub" claim
                .claim("iat", new Date()) // Manually set the issued date using "iat" claim
                .claim("exp", new Date(System.currentTimeMillis() + jwtExpirationMs)) // Manually set the expiration claim
                .signWith(signingKey) // Sign with the generated key and algorithm
                .compact(); // Return the JWT token as a string
    }
    
     /**
     * Extracts the username from the JWT token.
     * @param token The JWT token.
     * @return The username extracted from the token's "sub" claim.
     */
    public String getUserNameFromJwtToken(String token) {
        SecretKey signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        Claims claims = Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
        return claims.getSubject();
    }

    
      /**
     * Validates the JWT token by checking its signature, expiration, and other potential issues.
     * @param authToken The JWT token to validate.
     * @return true if the token is valid, false if any validation issues occur.
     */
    public boolean validateJwtToken(String authToken) {
        try {
            SecretKey signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(authToken).getPayload();
            return true;

        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
    
}
