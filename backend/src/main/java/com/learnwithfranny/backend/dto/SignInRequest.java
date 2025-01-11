package com.learnwithfranny.backend.dto;

import lombok.Data;

/**
 * Data Transfer Object (DTO) for Sign-In Request.
 * This class is used to encapsulate the user's sign-in data, including
 * the username and password, which will be sent to the server for authentication.
 * The use of Lombok's @Data annotation automatically generates getters, setters, 
 * toString, equals, and hashCode methods.
 */
@Data
public class SignInRequest {
    private String username;
    private String password;


    
}
