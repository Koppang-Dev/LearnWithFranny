package com.LearnWithFranny.LearnWithFranny.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;



// This is the CORS
// Currently allows any local host to send in requests

@Configuration
public class AppConfig implements WebMvcConfigurer {

    // CORS Initalization
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3001")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    
    // WebClient Initalization
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}