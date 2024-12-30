package com.LearnWithFranny.LearnWithFranny.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Mono;

@Service
public class GeminiService {

    // Initalize the WebClient
    private final WebClient.Builder webClientBuilder;

    // Retrieve the API Key and URL from .env
    @Value("${gemini.api.base-url}")
    private String baseUrl;

    @Value("${gemini.api.key}")
    private String apiKey;


    @Autowired
    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public Mono<String> processFileWithGemini(byte[] fileContent) {
        // Setup WebClient to interact with Gemini API
        return webClientBuilder
        .baseUrl(baseUrl)
        .build()
        .post()
        .uri("/process")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey) 
        .header(HttpHeaders.CONTENT_TYPE, "application/json") 
        .bodyValue("{\"contents\": [{\"parts\": [{\"text\": \"Explain how AI works\"}]}]}")
        .retrieve()
        .onStatus(
            status -> status.is4xxClientError() || status.is5xxServerError(),
                clientResponse -> clientResponse.bodyToMono(String.class)
                    .flatMap(errorBody -> Mono.error(
                        new RuntimeException("API Error: " + clientResponse.statusCode() + " - " + errorBody)
                    ))
        )
                .bodyToMono(String.class);
    }
}