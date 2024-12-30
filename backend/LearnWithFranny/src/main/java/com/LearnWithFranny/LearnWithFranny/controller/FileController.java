package com.LearnWithFranny.LearnWithFranny.controller;
import com.LearnWithFranny.LearnWithFranny.service.GeminiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;



import java.util.*;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3001")
public class FileController {

    // Gemini Service injection
    private final GeminiService geminiService;

    // Initalize Gemini Service
    @Autowired
    public FileController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }
   
    /*
     * Recieves the document in PDF, word or docx
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {

        // Print the received message
        System.out.println("File received: " + file.getOriginalFilename());

        // Send the file to Gemini
        try {
            // Get the file content as byte array
            byte[] fileContent = file.getBytes();

            // Call GeminiService to process the file
            Mono<String> responseMono = geminiService.processFileWithGemini(fileContent);

            // Wait for the response
            String response = responseMono.block();

            // Return response indicating success
            return ResponseEntity.ok("Gemini APU response" + response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error Processing file" + e.getMessage());
        }
    }
}