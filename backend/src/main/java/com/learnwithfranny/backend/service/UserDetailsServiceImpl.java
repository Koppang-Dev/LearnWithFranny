package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Custom implementation of Spring Security's UserDetailsService interface.
 * This service is responsible for loading user-specific data during the authentication process.
 * It retrieves the user's details from the UserRepository and returns an instance of UserDetails.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    /**
     * Constructor to inject the UserRepository dependency.
     * This repository is used to interact with the user data in the database.
     *
     * @param userRepository the repository that provides access to user data.
     */
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads user by email for Spring Security authentication.
     * Though the method name must be 'loadUserByUsername', the parameter is email.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email" + email));
        return UserDetailsImpl.build(user);
    }

    // Loading the user details by email
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email" + " " + email));
        return UserDetailsImpl.build(user);
    }
    
}
