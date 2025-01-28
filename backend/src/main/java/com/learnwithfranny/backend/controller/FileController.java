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
import com.learnwithfranny.backend.dto.FolderWithFilesResponse;

import java.util.List;
import com.learnwithfranny.backend.service.UserFileService;



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
            @RequestParam(value = "folderId", required = false) Long folderId) {

        try {
            // Call the service method to upload the file and save the metadata
            String result = userFileService.saveFile(file, fileName, userId, folderId); // Pass both file and userId to the service
            return new ResponseEntity<>(result, HttpStatus.OK); // Return success message
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
    @PostMapping("/{userId}/create-folder")
    public ResponseEntity<String> createFolder(@PathVariable("userId") Long userId, 
                                           @RequestParam("folderName") String folderName) {
    try {
        // Call the service method to create a new folder
        String result = userFileService.createFolder(folderName, userId);
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
    @DeleteMapping()
    public ResponseEntity<String> deleteFile(@RequestParam("fileName") String fileName, @RequestParam("userId") Long userId, @RequestParam("folderId") Long folderId) {
        return new ResponseEntity<>(userFileService.deleteFile(userId, fileName, folderId), HttpStatus.OK);
    }
}