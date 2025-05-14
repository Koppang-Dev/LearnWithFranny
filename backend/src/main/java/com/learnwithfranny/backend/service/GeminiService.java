package com.learnwithfranny.backend.service;

import java.util.Map;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webcClient;

    // Constructor
    public GeminiService() {
        this.webcClient = WebClient.builder()
        .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent")
        .build();    }

    // Generating Geminis Text
    public String generateText(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)))));

        return webcClient.post().uri(UriBuilder -> UriBuilder.queryParam("key", apiKey).build())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
    

    // Cleaning AI Response
    public String extractText(String givenJson) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(givenJson);
    
        JsonNode candidatesNode = root.path("candidates");
        if (!candidatesNode.isArray() || candidatesNode.isEmpty()) {
            throw new IOException("Gemini response has no candidates");
        }
    
        JsonNode firstCandidate = candidatesNode.get(0);
        if (firstCandidate == null || firstCandidate.path("content").isMissingNode()) {
            throw new IOException("Missing 'content' in Gemini response");
        }
    
        JsonNode partsNode = firstCandidate.path("content").path("parts");
        if (!partsNode.isArray() || partsNode.isEmpty()) {
            throw new IOException("Missing 'parts' in Gemini response");
        }
    
        JsonNode textNode = partsNode.get(0).path("text");
        if (textNode == null || textNode.isMissingNode()) {
            throw new IOException("Missing 'text' in Gemini response");
        }
    
        String rawContent = textNode.asText();
        String cleanedJson = rawContent.replaceAll("(?s)^```json\\s*|```$", "").trim();
    
        System.out.println("=== Extracted Inner JSON ===\n" + cleanedJson);
        return cleanedJson;
    }
    
    
}
