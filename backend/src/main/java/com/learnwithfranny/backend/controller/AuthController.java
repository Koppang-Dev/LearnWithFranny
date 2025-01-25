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
    public ResponseEntity<?> signin(@RequestBody SignInRequest signInRequest) {

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
            String jwt = jwtUtil.generateJwtToken(authentication);

            // Retrieve user details from the authentication object
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Get the list of roles the user has and convert them to a list of strings
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            // Construct the JWT response
            JwtResponse res = new JwtResponse();
            res.setToken(jwt);
            res.setId(userDetails.getId());
            res.setUsername(userDetails.getUsername());
            res.setRoles(roles);
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

        // Create a set of roles for the new user, assigning the default user role
        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);

        // Role is not found
        if (userRole.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("role not found");
        }

        // Initialize the user entity and set its details
        roles.add(userRole.get());
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(hashedPassword);
        user.setEmail(signUpRequest.getEmail());
        user.setRoles(roles);

        // Saving the new user to the repository
        userRepository.save(user);
        return ResponseEntity.ok("User Registered Success");
    }
    
    
    
    





    
}
