package com.LearnWithFranny.LearnWithFranny.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


// This is the CORS
// Currently allows any local host to send in requests
// TODO: Change for development


@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
                .allowedOrigins("http://localhost:3001") 
                .allowedMethods("*") 
                .allowedHeaders("*");

    }
}