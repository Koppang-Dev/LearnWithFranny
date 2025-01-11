package com.learnwithfranny.backend.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * The AuthEntryPointJwt class is responsible for handling unauthorized access attempts
 * to protected resources. It implements the AuthenticationEntryPoint interface, which is 
 * used by Spring Security to handle authentication failures.
 * This class is used to intercept authentication errors and send an appropriate response 
 * to the client when the user is unauthorized to access a resource.
 */
@Log4j2
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

     /**
     * Handles authentication failures by sending an HTTP 401 Unauthorized status code
     * and logging the error message.
     * This method is invoked when an unauthenticated user tries to access a protected resource.
     * 
     * @param request the HTTP request that triggered the authentication failure.
     * @param response the HTTP response to be sent back to the client.
     * @param authException the exception thrown during the authentication process.
     * @throws IOException if an input or output error occurs during the handling of the request.
     * @throws ServletException if the request could not be processed.
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        log.error("Unauthorized error:", authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
    }

    
}
