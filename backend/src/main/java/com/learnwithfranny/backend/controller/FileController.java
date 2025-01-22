package com.learnwithfranny.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {

    @PostMapping("/fileUpload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file) {

        // Retrieve file name
        String fileName = file.getOriginalFilename();

        try {

            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    } 
}
