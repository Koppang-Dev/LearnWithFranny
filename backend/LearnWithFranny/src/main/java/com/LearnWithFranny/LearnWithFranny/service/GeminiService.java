package com.LearnWithFranny.LearnWithFranny.service;


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

    @Autowired
    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    
    public Mono<String> processFileWithGemini(String fileUrl) {
        // Setup WebClient to interact with Gemini API
        return webClientBuilder.baseUrl("https://gemini-api.example.com")  // Replace with Gemini API URL
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer YOUR_GEMINI_API_KEY")  // API Key
                .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .post()
                .bodyValue("{\"fileUrl\": \"" + fileUrl + "\"}")  // You can send the file URL or data
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                          clientResponse -> Mono.error(new Exception("API Error: " + clientResponse.statusCode())))
                .bodyToMono(String.class);  // You can return whatever response type you need
    }
}
