package com.learnwithfranny.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.learnwithfranny.backend.dto.CreateFolderRequest;
import com.learnwithfranny.backend.dto.DeleteFolderRequest;
import com.learnwithfranny.backend.dto.DeleteRequest;
import com.learnwithfranny.backend.dto.FileDownloadRequest;
import com.learnwithfranny.backend.dto.FileDownloadResponse;
import com.learnwithfranny.backend.dto.FolderWithFilesResponse;
import com.learnwithfranny.backend.dto.MoveFileRequest;
import com.learnwithfranny.backend.dto.RenameFileRequest;
import com.learnwithfranny.backend.dto.RenameFolderRequest;

import java.util.List;
import java.util.Map;

import com.learnwithfranny.backend.service.UserFileService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private UserFileService userFileService;


    // Uploading file
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("file") MultipartFile file, @RequestParam("fileName") String fileName,
            @RequestParam(value = "folderId", required = false) String folderIdString) {

        // If the folderID is null that means the file has no folder
        Long folderId = null;
        if (folderIdString != null && !folderIdString.equals("null")) {
            folderId = Long.parseLong(folderIdString);
        } else {
            // Handle the case where folderId is null, maybe set to default or leave as null
            folderId = null;
        }
        try {
            // Call the service method to upload the file and save the metadata
            String result = userFileService.saveFile(file, fileName, folderId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("File upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Creating folder
    @PostMapping("/create-folder")
    public ResponseEntity<String> createFolder(@RequestBody CreateFolderRequest folderRequest) {
        try {

            // Call the service method to create a new folder
            String result = userFileService.createFolder(folderRequest.getFolderName(),
                    folderRequest.getParentFolderId());
            
            
            return new ResponseEntity<>(result, HttpStatus.CREATED); // Return success message with status 201
        } catch (Exception e) {
            return new ResponseEntity<>("Folder creation failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Retrieves all of the files from a users account
    @GetMapping()
    public List<FolderWithFilesResponse> getUserFiles() {
        return userFileService.getAllFoldersByUserId();
    }

    // Downloading file endpoint
    @PostMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadFile(@RequestBody FileDownloadRequest request) {
        try {

            Long fileId = request.getFileId();

            // Call service to handle the download logic
            FileDownloadResponse downloadResponse = userFileService.downloadFile(fileId);

            // Return file as a download response
            ByteArrayResource resource = new ByteArrayResource(downloadResponse.getData());
            return ResponseEntity.ok()
                    .contentLength(downloadResponse.getData().length)
                    .header("Content-Type", "application/octet-stream")
                    .header("Content-Disposition", "attachment; filename=\"" + downloadResponse.getFileName() + "\"")
                    .body(resource);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Handle other errors
        }
    }

       // Deleting specific file
       @DeleteMapping("/{fileId}")
       public ResponseEntity<?> deleteFile(@PathVariable(name = "fileId") Long fileId) {
           try {
               userFileService.deleteFile(fileId);
               return ResponseEntity.ok("Successfully deleted file");
           } catch (Exception e) {
               // Handle any unexpected errors
               return ResponseEntity.status(500).body("An unexpected error occurred deleting file: " + e.getMessage());
           }
           }
    
        // Deleting a folder
    @DeleteMapping("/folder/delete/{folderId}")
    public ResponseEntity<?> deleteFolder(@PathVariable(name="folderId") Long folderId) {
        try {
            userFileService.deleteFolder(folderId);
            return ResponseEntity.ok("Successfully deleted folder");
        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(500).body("An unexpected error occurred deleting folder: " + e.getMessage());
        }
    }

    // Renaming a folder
    @PutMapping("/folder/rename")
    public ResponseEntity<String> renameFolder(@RequestBody RenameFolderRequest request) {

        try {
            userFileService.renameFolder(request.getUserId(), request.getFolderId(), request.getNewFolderName());
            return new ResponseEntity<>(HttpStatus.CREATED); // Return success message with status 201

        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    // Renaming a file
    @PutMapping("/rename")
    public ResponseEntity<String> renameFile(@RequestBody RenameFileRequest request) {

        try {
            userFileService.renameFile(request.getUserId(), request.getFileId(), request.getNewFileName());
            return new ResponseEntity<>(HttpStatus.CREATED); // Return success message with status 201

        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/move")
    public ResponseEntity<String> moveFileToFolder(@RequestBody MoveFileRequest request) {
        try {
            userFileService.moveFileToFolder(
                    request.getUserId(),
                    request.getFileId(),
                    request.getFromFolderId(),
                    request.getToFolderId());
            return ResponseEntity.ok("File moved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error moving file: " + e.getMessage());
        }
    }

    @PostMapping("/get-presigned-url")
    public ResponseEntity<String> getPresignedUrl(@RequestBody Map<String, Long> request) {
        try {
            Long fileId = request.get("fileId");
            // Call the service to retrieve the pre-signed URL
            String preSignedUrl = userFileService.RetrieveFileUrl(fileId);

            // Return the pre-signed URL in the response
            return ResponseEntity.ok(preSignedUrl);
        } catch (RuntimeException e) {
            // Handle the case where the file is not found or unauthorized access
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Unauthorized file access");
        } catch (Exception e) {
            // Handle any other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while generating the pre-signed URL");
        }
    }
}