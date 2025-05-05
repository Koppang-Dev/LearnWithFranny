package com.learnwithfranny.backend.config;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.service.SessionService;
import com.learnwithfranny.backend.util.JwtUtil;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.Role;
import com.learnwithfranny.backend.model.Session;
import com.learnwithfranny.backend.model.ERole;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final SessionService sessionService;

    @Lazy
    public OAuth2AuthenticationSuccessHandler(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, SessionService sessionService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.sessionService = sessionService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        // Retrieve user details from Google
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        // Create or update the user in the database
        User user = createOrUpdateUser(email, name);
        sessionService.createSessionFromRequest(user, request);

        // Generating the JWT Token
        String jwt = jwtUtil.generateJwtToken(authentication);

        // Determine if we are running locally
        boolean isLocalHost = request.getServerName().equals("localhost");

        if (isLocalHost) {
            // Localhost: use Cookie API normally
            Cookie jwtCookie = new Cookie("token", jwt);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false); // Secure must be false for localhost
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60); // 1 day
            response.addCookie(jwtCookie);
        } else {
            // Production: manually construct the Set-Cookie header
            String cookie = String.format(
                "token=%s; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=%d; Domain=learn-with-franny.vercel.app",
                jwt, 24 * 60 * 60
            );
            response.setHeader("Set-Cookie", cookie);
        }

        // Redirect to the frontend after successful login
        String redirectUrl = request.getServerName().equals("localhost")
            ? "http://localhost:3001/dashboard"
            : "https://learn-with-franny.vercel.app/dashboard";

        response.sendRedirect(redirectUrl);
    }

    
    private User createOrUpdateUser(String email, String name) {


        // Check if the user already exists
        Boolean existingUser = userRepository.existsByEmail(email);
        
        if (existingUser == false) {
            // User doesn't exist, create a new one
            User newUser = new User();
            newUser.setEmail(email);

            // Creating the unique username
            String cleanName = name.trim().replaceAll("\\s+", "-");
            String uniqueUsername = cleanName + "-" + UUID.randomUUID().toString().substring(0, 4);
            newUser.setUsername(uniqueUsername);
            newUser.setName(name);
            newUser.setTwoFactorAuthentication(false);
            newUser.setPasswordChangedAt(LocalDateTime.now());

            // Generate a random password (for database consistency)
            String tempPassword = UUID.randomUUID().toString();
            String encodedPassword = passwordEncoder.encode(tempPassword);
            newUser.setPassword(encodedPassword);

            // Save the new user to the repository
            userRepository.save(newUser);
        }

        return userRepository.findByEmail(email).orElseThrow();
    }
}
