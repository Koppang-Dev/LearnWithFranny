package com.LearnWithFranny.LearnWithFranny.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3001")
public class FileController {

   
    /*
     * Recieves the document in PDF, word or docx
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // Extract the data from the JSON body


        // Print the received message
        System.out.println("Received message: ");
        System.out.println("File received: " + file.getOriginalFilename());


        // Return a response indicating success
        return ResponseEntity.ok("Data received successfully");
    }
}