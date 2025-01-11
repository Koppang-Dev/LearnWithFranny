package com.learnwithfranny.backend.dto;

import lombok.Data;

/**
 * DTO class for handling user sign-up requests.
 * This class is used to map the incoming JSON data for user registration.
 * It contains the necessary fields for a user to sign up: username, email, and password.
 */
@Data
public class SignUpRequest {
    private String username;
    private String email;
    private String password;
}
