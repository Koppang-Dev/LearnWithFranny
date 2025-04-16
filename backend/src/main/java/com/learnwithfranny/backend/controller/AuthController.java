package com.learnwithfranny.backend.controller;

import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.ERole;
import com.learnwithfranny.backend.model.PasswordResetToken;
import com.learnwithfranny.backend.model.Role;

import com.learnwithfranny.backend.exceptions.ErrorResponse;
import com.learnwithfranny.backend.util.JwtUtil;
import com.learnwithfranny.backend.dto.SignInRequest;
import com.amazonaws.Response;
import com.learnwithfranny.backend.dto.JwtResponse;

import com.learnwithfranny.backend.dto.SignUpRequest;
import com.learnwithfranny.backend.service.EmailService;
import com.learnwithfranny.backend.service.PasswordResetService;
import com.learnwithfranny.backend.service.UserDetailsImpl;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Authentication Controller for handling user authentication and registration requests.
 * Provides endpoints for user sign-in and sign-up operations.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${frontend.url}")
    private String frontendBaseUrl;
    
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private PasswordResetService passwordResetService;
    private EmailService emailService;

    /**
     * Constructor to initialize dependencies.
     *
     * @param userRepository      Repository for user data
     * @param passwordEncoder     Encoder for password hashing
     * @param roleRepository      Repository for roles
     * @param authenticationManager Manages authentication process
     * @param jwtUtil             Utility for generating JWT tokens
     */
    public AuthController(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            RoleRepository roleRepository,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil, PasswordResetService passwordResetService, EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordResetService = passwordResetService;
        this.emailService = emailService;
    }

    /**
     * Handles sign-in (login) requests. Authenticates the user and returns a JWT token.
     * 
     * @param signInRequest The request body containing username and password
     * @return ResponseEntity containing the JWT token and user details
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signin(HttpServletRequest request, HttpServletResponse response,
            @RequestBody SignInRequest signInRequest) {

        // Email Form validation
        if (signInRequest.getEmail() == null || signInRequest.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Email must not be empty"));
        }

        // Password form validation
        if (signInRequest.getPassword() == null || signInRequest.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Password must not be empty"));
        }

        // Authenticate the user based on provided username and password
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));

            // Set the authentication context for further requests
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token after successful authentication
            boolean rememberMe = signInRequest.isRememberMe();
            String jwt = jwtUtil.generateJwtToken(authentication, rememberMe);

            // Retrieve user details from the authentication object
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Determine the environment
            boolean isLocalHost = request.getServerName().equals("localhost");

            // Using HttpOnly Cookie
            Cookie jwtCookie = new Cookie("token", jwt);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(!isLocalHost); // secure = false for local dev
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(24 * 60 * 60); // 1 day
            jwtCookie.setDomain(isLocalHost ? "localhost" : "your-production-domain.com");
            response.addCookie(jwtCookie);

            // Construct the JWT response
            JwtResponse res = new JwtResponse();
            System.out.println("JWT RESPONSE SAVED" + res);
            res.setId(userDetails.getId());
            res.setUsername(userDetails.getUsername());
            res.setEmail(userDetails.getEmail());

            // Return the response with the generated JWT token and user details
            return ResponseEntity.ok(res);
        } catch (BadCredentialsException e) {
            // Handle invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("An error occured during login"));
        }
    }

    /**
    * Handles sign-up (registration) requests. Validates the data, creates a new user,
    * and assigns default roles.
    * 
    * @param signUpRequest The request body containing user details for registration
    * @return ResponseEntity with appropriate status and message
    */
    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@RequestBody SignUpRequest signUpRequest) {

        // Email Form validation
        if (signUpRequest.getUsername() == null || signUpRequest.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Email must not be empty"));
        }

        // Password form validation
        if (signUpRequest.getPassword() == null || signUpRequest.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Password must not be empty"));
        }

        // Check if the username already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("username is already taken"));
        }

        // Check if the email is already taken
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("email is already taken"));
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(signUpRequest.getPassword());

        // Initialize the user entity and set its details
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(hashedPassword);
        user.setEmail(signUpRequest.getEmail());

        // Saving the new user to the repository
        userRepository.save(user);

        // Create the default folder for the user

        return ResponseEntity.ok("User Registered Success");
    }

    // Resetting users password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Email is required"));
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("No user found with that email"));
        }

        // Getting the user
        User user = userOptional.get();

        // Creating the PasswordResetToken
        PasswordResetToken token = passwordResetService.createPasswordResetToken(user);

        // Creating the reset link for the user
        String resetLink = "http://localhost:3001" + "/reset-password?token=" + token.getToken();

        // Sending the email to the user
        emailService.sendPasswordResetEmail(email, resetLink);
        return ResponseEntity.ok("Password reset email sent successfully");

    }

    // Confirming the password reset
    @PostMapping("/confirm-reset")
    public ResponseEntity<?> confirmPasswordReset(@RequestBody Map<String, String> request) {
        String newPassword = request.get("newPassword");
        String token = request.get("token");

        // Checking if the token is still valid
        if (!passwordResetService.isTokenValid(token)) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Token is expired"));
        }

        // Retrieving the user via token
        User user = passwordResetService.getUserByToken(token);
        if (user == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("User not found"));
        }

        // Set the new password for the user
        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);
        userRepository.save(user);

        // Mark token as used
        passwordResetService.markTokenAsUsed(token);

        // Success
        return ResponseEntity.ok().body(Map.of("message", "Password reset successfully"));
    }
}