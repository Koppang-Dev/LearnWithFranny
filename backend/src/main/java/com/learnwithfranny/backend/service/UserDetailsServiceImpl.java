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
     * Loads the user details by username.
     * This method is called by Spring Security during authentication to retrieve user information based on the provided username.
     * If the user is found, it returns  a UserDetails object representing the user.
     * If the user is not found, it throws a UsernameNotFoundException.
     *
     * @param username the username of the user to load.
     * @return UserDetails representing the user with the specified username.
     * @throws UsernameNotFoundException if no user is found with the given username.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username" + username));
        return UserDetailsImpl.build(user);
    }
    
}
