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
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    private UserFileService userFileService;

    /**
     * Endpoint for uploading a file for a specific user.
     * 
     * This method handles the file upload process:
     * 1. It first checks if a folder ID is provided.
     * 2. If a folder ID is provided, it validates whether the folder exists and belongs to the user.
     * 3. If no folder ID is provided, it checks if the user has a default folder.
     *    - If a default folder exists, it uses that folder.
     *    - If no default folder exists, it creates one for the user.
     * 4. After determining the folder, the file is uploaded, and its metadata is saved in the database.
     * 5. If the process is successful, it returns a success message.
     * 6. If any errors occur during the process, it returns an error message with the details.
     *
     * @param userId    The ID of the user who is uploading the file.
     * @param file      The file being uploaded.
     * @param fileName  The name of the file being uploaded.
     * @param folderId  (Optional) The ID of the folder where the file should be stored. 
     *                  If not provided, the file will be stored in the default folder.
     * @return          A ResponseEntity containing the result of the upload process.
     */
    @PostMapping("/{userId}/upload")
    public ResponseEntity<String> handleFileUpload(@PathVariable("userId") Long userId,
            @RequestParam("file") MultipartFile file, @RequestParam("fileName") String fileName,
            @RequestParam(value = "folderId", required = false) String folderIdString) {

        // If the folderID is null that means the file has no folder
        Long folderId = null;
        if (folderIdString != null && !folderIdString.equals("null")) {
            folderId = Long.parseLong(folderIdString);
        } else {
            // Handle the case where folderId is null, maybe set to default or leave as null
            folderId = null; // or use some other default folder ID logic
        }

        try {
            // Call the service method to upload the file and save the metadata
            String result = userFileService.saveFile(file, fileName, userId, folderId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("File upload failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to create a new folder for a specific user.
     * 
     * @param userId The ID of the user for whom the folder is being created.
     * @param folderName The name of the new folder to be created.
     * @return ResponseEntity containing the result message and HTTP status code.
     */
    @PostMapping("/create-folder")
    public ResponseEntity<String> createFolder(@RequestBody CreateFolderRequest folderRequest) {
        try {

            // Call the service method to create a new folder
            String result = userFileService.createFolder(folderRequest.getFolderName(), folderRequest.getUserId(),
                    folderRequest.getParentFolderId());
            
            
            return new ResponseEntity<>(result, HttpStatus.CREATED); // Return success message with status 201
        } catch (Exception e) {
            return new ResponseEntity<>("Folder creation failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Retrieves all of the files from a users account
    @GetMapping("/{userId}/files")
    public List<FolderWithFilesResponse> getUserFiles(@PathVariable(name = "userId") Long userId) {
        return userFileService.getAllFoldersByUserId(userId);
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

    @DeleteMapping()
    public ResponseEntity<String> deleteFile(@RequestBody DeleteRequest deleteRequest) {
        try {
            // Calling the service to delete the file
            ResponseEntity<String> response = userFileService.deleteFile(
                    deleteRequest.getUserId(),
                    deleteRequest.getFileName(),
                    deleteRequest.getFolderId());

            // Return the service's response (success or failure message)
            return response;

        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @DeleteMapping("/folder/delete")
    public ResponseEntity<String> deleteFolder(@RequestBody DeleteFolderRequest deleteRequest) {
        try {
            // Calling the service to delete the file
            ResponseEntity<String> response = userFileService.deleteFolder(
                    deleteRequest.getUserId(),
                    deleteRequest.getFolderId());

            // Return the service's response (success or failure message)
            return response;

        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
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