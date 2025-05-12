package com.learnwithfranny.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnwithfranny.backend.dto.GeneratedDeckDTO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import java.io.IOException; 

@Service
public class FlashcardService {

    private final GeminiService geminiService;
    private final DeckService deckService;

    public FlashcardService(GeminiService geminiService, DeckService deckService) {
        this.geminiService = geminiService;
        this.deckService = deckService;
    }

    // Process Uploaded File
    public void processUploadedFile(MultipartFile file) throws IOException {
        try {
            if (file.isEmpty()) {
                throw new IllegalArgumentException("No file uploaded");
            }

            String filename = file.getOriginalFilename();
            byte[] content = file.getBytes();
            String extractedText;

            // Detect and parse file
            if (filename.endsWith(".pdf")) {
                extractedText = parsePdf(content);
            } else if (filename.endsWith(".doc") || filename.endsWith(".docx")) {
                extractedText = parseDocx(content);
            } else {
                throw new IllegalArgumentException("Unsupported file type.");
            }

            // Creating the Prompt
            String prompt = """
                Given the following content, generate a deck of flashcards. 

                Return ONLY a JSON object with this exact format:

                {
                "title": "Short deck title",
                "description": "1-2 sentence summary of what the deck is about",
                "flashcards": [
                    { "front": "Question or term?", "back": "Answer or explanation" },
                    ...
                ]
                }

                Content:
                        """ + extractedText;
            
            String json = geminiService.generateText(prompt);
            
            String cleanedString = geminiService.extractText(json);
            
            // Parse JSON
            ObjectMapper mapper = new ObjectMapper();
            GeneratedDeckDTO generatedDeck = mapper.readValue(cleanedString, GeneratedDeckDTO.class);

            // Save VIA deck service
            deckService.createDeckFromAIFlashcards(
                generatedDeck.getFlashcards(),
                generatedDeck.getTitle(),
                generatedDeck.getDescription()
            );
    } catch (Exception e) {
        System.err.println("Flashcard generation failed: " + e.getMessage());
        throw new RuntimeException("Flashcard generation failed: " + e.getMessage(), e);   
        }
    }


    // Parsing PDFS
    private String parsePdf(byte[] content) throws IOException{
        try (PDDocument document = PDDocument.load(content)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    // Parsing Docx
    private String parseDocx(byte[] content) throws IOException {
        try (XWPFDocument doc = new XWPFDocument(new java.io.ByteArrayInputStream(content))) {
            StringBuilder sb = new StringBuilder();
            for (XWPFParagraph para : doc.getParagraphs()) {
                sb.append(para.getText()).append("\n");
            }
            return sb.toString();
        }
    }
}
