package com.learnwithfranny.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.learnwithfranny.backend.service.StorageService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import com.learnwithfranny.backend.dto.FileResponse;
import java.util.List;
import com.learnwithfranny.backend.service.UserFileService;



@RestController
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    private StorageService service;

    @Autowired
    private UserFileService userFileService;

    // Uploading file endpoint
    @PostMapping("/{userId}/upload")
    public ResponseEntity<String> handleFileUpload(@PathVariable("userId") Long userId, @RequestParam("file") MultipartFile file) {
        try {
            // Call the service method to upload the file and save the metadata
            String result = userFileService.saveFile(file, userId);  // Pass both file and userId to the service
            return new ResponseEntity<>(result, HttpStatus.OK);  // Return success message
        } catch (Exception e) {
            return new ResponseEntity<>("File upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   

    // Retrieves all of the files from a users account
    @GetMapping("/{userId}/files")
    public List<FileResponse> getUserFiles(@PathVariable(name = "userId") Long userId) {
        return userFileService.getAllFilesByUserId(userId);
    }

    // Downloading file endpoint
    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {

        // Converting to ByteArrayResource
        byte[] data = service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
    

    // Deleting the file
    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        return new ResponseEntity<>(service.deleteFile(fileName), HttpStatus.OK);
    }
}