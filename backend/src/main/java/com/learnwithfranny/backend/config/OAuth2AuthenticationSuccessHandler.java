package com.learnwithfranny.backend.config;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.Role;
import com.learnwithfranny.backend.model.ERole;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.io.IOException;
import java.util.UUID;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Lazy
    public OAuth2AuthenticationSuccessHandler(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
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
        createOrUpdateUser(email, name);

        // Redirect to the frontend after successful login
        response.sendRedirect("http://localhost:3001/dashboard");
    }
    
    private void createOrUpdateUser(String email, String name) {
        // Check if the user already exists
        Boolean existingUser = userRepository.existsByEmail(email);
        
        if (existingUser == false) {
            // User doesn't exist, create a new one
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(name);

            // Generate a random password (for database consistency)
            String tempPassword = UUID.randomUUID().toString();
            String encodedPassword = passwordEncoder.encode(tempPassword);
            newUser.setPassword(encodedPassword);

            // Assign default user role
            Set<Role> roles = new HashSet<>();
            Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);

            if (userRole.isEmpty()) {
                // If role is not found, you might want to handle this
                System.out.println("Role not found: " + ERole.ROLE_USER);
                return;
            }
            roles.add(userRole.get());
            newUser.setRoles(roles);

            // Save the new user to the repository
            userRepository.save(newUser);
        }
    }
}
