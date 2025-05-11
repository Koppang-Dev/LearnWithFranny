package com.learnwithfranny.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException; 

@Service
public class FlashcardService {

    // Process Uploaded File
    public void processUploadedFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("No file uploaded");
        }

        String filename = file.getOriginalFilename();
        byte[] content = file.getBytes();

        // Detect and parse file
        if (filename.endsWith(".pdf")) {
            String text = parsePdf(content);
        } else if (filename.endsWith(".doc") || filename.endsWith(".docx")) {
            String text = parseDocx(content);
        } else {
            throw new IllegalArgumentException("Unsupported file type.");
        }
    }


    // Parsing PDFS
    private String parsePdf(byte[] content) {
        return "...";
    }

    // Parsing Docx
    private String parseDocx(byte[] content) {
        return "...";
    }
}
