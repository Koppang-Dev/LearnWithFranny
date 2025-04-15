package com.learnwithfranny.backend.filter;

import java.io.IOException;
import com.learnwithfranny.backend.service.UserDetailsServiceImpl;
import com.learnwithfranny.backend.util.JwtUtil;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

/**
 * AuthTokenFilter is a custom filter responsible for authenticating requests
 * based on the presence of a JWT token in the Authorization header. This filter
 * ensures that the user is authenticated for each request before accessing 
 * protected resources.
 */
@Log4j2
@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    
    private JwtUtil jwtUtil;
    private UserDetailsServiceImpl userDetailsService;

     /**
     * Constructor to inject dependencies needed for JWT validation and user details retrieval.
     *
     * @param jwtUtil an instance of JwtUtil to handle JWT-related operations.
     * @param userDetailsService an instance of UserDetailsServiceImpl to fetch user details.
     */
    public AuthTokenFilter(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

     /**
     * Method that is invoked on every HTTP request to authenticate the user.
     * The method extracts and validates the JWT token from the request and 
     * sets the authentication context if the token is valid.
     *
     * @param request the HTTP request to be processed.
     * @param response the HTTP response to be sent.
     * @param filterChain the filter chain for further processing of the request.
     * @throws ServletException if an error occurs while processing the request.
     * @throws IOException if an I/O error occurs during request processing.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                try {
                    String jwt = parseJwt(request);

                    // If a valid JWT token is present, authenticate the user
                    if (jwt != null && jwtUtil.validateJwtToken(jwt)) {
                        String email = jwtUtil.getEmailFromJwtToken(jwt);
                        UserDetails userDetails = userDetailsService.loadUserByEmail(email);
                        UsernamePasswordAuthenticationToken  authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                } catch (Exception e) {
                    // Log an error if authentication fails

                    log.error("Cannot set user authentication: {}", e);
                }
                filterChain.doFilter(request, response);
    }


    /**
     * Helper method to extract the JWT token from the Authorization header of the HTTP request.
     * 
     * @param request the HTTP request containing the Authorization header.
     * @return the JWT token if present, or null if no valid token is found.
     */
    private String parseJwt(HttpServletRequest request) {
        
        // First check the authorization header
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        // Check the cookies for the token
        if (request.getCookies() != null) {
            for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        // No JWT token found
        return null;
    }    
}
