package com.learnwithfranny.backend.controller;

import com.learnwithfranny.backend.repository.UserRepository;
import com.learnwithfranny.backend.repository.RoleRepository;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.ERole;
import com.learnwithfranny.backend.model.Role;

import com.learnwithfranny.backend.exceptions.ErrorResponse;
import com.learnwithfranny.backend.util.JwtUtil;
import com.learnwithfranny.backend.dto.SignInRequest;
import com.learnwithfranny.backend.dto.JwtResponse;

import com.learnwithfranny.backend.dto.SignUpRequest;
import com.learnwithfranny.backend.service.UserDetailsImpl;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    
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
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
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
        if (signInRequest.getUsername() == null || signInRequest.getUsername().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Email must not be empty"));
        }

        // Password form validation
        if (signInRequest.getPassword() == null || signInRequest.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Password must not be empty"));
        }

        // Authenticate the user based on provided username and password
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

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
                    .body(new ErrorResponse("Invalid username or password"));
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

        // Sending email for password reset
        System.out.println("Sending password reset link to: " + email);

        return ResponseEntity.ok("Password reset email sent successfully");
    }

}
