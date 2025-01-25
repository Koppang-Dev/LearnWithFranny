package com.learnwithfranny.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Data Transfer Object (DTO) for the JWT Response.
 * This class encapsulates the structure of the JSON Web Token (JWT) response 
 * returned to the client after successful authentication.
 * 
 * It includes essential user details and the token information.
 * The usage of Lombok annotations (@Data and @NoArgsConstructor) 
 * simplifies boilerplate code like getters, setters, and constructors.
 */
@Data
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String username;
    private List<String> roles;
    
}
