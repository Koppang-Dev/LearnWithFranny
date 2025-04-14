package com.learnwithfranny.backend.config;


import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class CorsConfiguration {

    @Value("${frontend.url}")
    private String frontendUrls;
    


    /**
     * Bean configuration for CORS (Cross-Origin Resource Sharing).
     * 
     * This method creates a custom implementation of WebMvcConfigurer to configure CORS settings for the application.
     * The anonymous class implementation allows for quick, inline configuration without the need for a separate class.
     * It defines the allowed HTTP methods and headers for all endpoints ("/**").
     * 
     * @return a WebMvcConfigurer that applies the CORS configuration
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Both production and development
                String[] allowedOrigins = frontendUrls.split(",");
                System.out.println("Origins: " + Arrays.toString(allowedOrigins));

                // Allow CORS for all routes and specify allowed methods and headers
                registry.addMapping("/**").allowedOrigins("http://localhost:3001").allowedMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
                        .allowedHeaders("*").allowCredentials(true);
            }
        };
    }
    
}
