package com.learnwithfranny.backend.controller;

import org.apache.catalina.User;
import org.springframework.context.support.BeanDefinitionDsl.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import io.micrometer.core.ipc.http.HttpSender.Response;

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

        // Authenticate the user based on provided username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

        // Set the authentication context for further requests
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT token after successful authentication
        String jwt = jwtUtil.generateJwtToken(authentication);

        // Retrieve user details from the authentication object
        UserDetailsImpl userDetails = (UserDetailsImp) authentication.getPrincipal();

        // Get the list of roles the user has and convert them to a list of strings
        List<String> roles = userDetails.getAuthoriities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // Construct the JWT response
        JwtResponse res = new JwtResponse();
        res.setToken(jwt);
        res.setId(userDetails.getId());
        res.setUsername(userDetails.getUsername());
        res.setRoles(roles);

        // Return the response with the generated JWT token and user details
        return ResponseEntity.ok(res);
    }

     /**
     * Handles sign-up (registration) requests. Validates the data, creates a new user,
     * and assigns default roles.
     * 
     * @param signUpRequest The request body containing user details for registration
     * @return ResponseEntity with appropriate status and message
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest signUpRequest) {

        // Check if the username already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username is already taken");
        }

        // Check if the email is already taken
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("email is already taken");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(signUpRequest.getPassword());

        // Create a set of roles for the new user, assigning the default user role
        Set<Role> roles = new HashSet<>();
        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);

        // Role is not found
        if (userRole.isEmpty()) {
            return ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR).body("role not found");
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
