package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.dto.FileResponse;
import com.learnwithfranny.backend.dto.FolderWithFilesResponse;
import com.learnwithfranny.backend.model.Folder;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.UserFileMetaData;
import com.learnwithfranny.backend.repository.FolderRepository;
import com.learnwithfranny.backend.repository.UserFileRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.lang.StackWalker.Option;
import java.util.Collections;
import java.util.Date;


/**
 * Service class to handle business logic related to user files.
 * This includes operations such as saving file metadata and retrieving user files.
 */
@Service
public class UserFileService {
    private final UserFileRepository userFileRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final FolderRepository folderRepository;

    public UserFileService(UserFileRepository userFileRepository, StorageService storageService, UserRepository userRepository, FolderRepository folderRepository) {
        this.userFileRepository = userFileRepository;
        this.storageService = storageService;
        this.userRepository = userRepository;
        this.folderRepository = folderRepository;
    }


     /**
     * Saves the uploaded file, its metadata, and associates it with the specified folder. 
     * If no folder is provided, a default folder is created for the user.
     * 
     * @param file      The file being uploaded.
     * @param fileName  The name of the file.
     * @param userId    The ID of the user uploading the file.
     * @param folderId  The ID of the folder where the file should be stored. If null, a default folder will be created.
     * @return          A success message with the file URL if the upload is successful.
     */
     public String saveFile(MultipartFile file, String fileName, Long userId, Long folderId) {

        // Find the user based on the unique ID
        User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

         // Generating a unique file name for every users'
        String timestamp = String.valueOf(System.currentTimeMillis());
        String uniqueFileName = userId + "_" + timestamp + "_" + fileName;

         // Saving the file information in s3 storage
         String fileUrl = storageService.uploadFile(file, uniqueFileName);


         // If no folderID was given then save it to the default folder
         Folder folder;

         if (folderId == null) {
             // Save the file in the given folder
             String default_folder_name = "Default Folder";
             Optional<Folder> optionalFolder = folderRepository.findByUserIdAndName(userId, default_folder_name);

             // If no default folder exists, create one and assign it to folderToUse
             if (optionalFolder.isPresent()) {
                 folder = optionalFolder.get();
             } else {
                 // No default folder, so create a new one
                 folder = new Folder("Default Folder", user);
                 folderRepository.save(folder);
             }

             //  Find the folder for the file to be saved in 
         } else {
             Optional<Folder> desiredFolder = folderRepository.findByUser_IdAndId(userId, folderId);

             if (desiredFolder.isPresent()) {
                folder = desiredFolder.get();
            } else {
                throw new RuntimeException("Folder not found for user with ID " + userId + " and folder ID " + folderId);
            }
         }
          
        
         // Saving the file metadata
         UserFileMetaData userFileMetaData = new UserFileMetaData();
         userFileMetaData.setFolder(folder);
         userFileMetaData.setFileName(fileName);
         userFileMetaData.setS3Key(uniqueFileName);
         userFileMetaData.setFileType(file.getContentType());
         userFileMetaData.setFileSize(file.getSize());
         userFileMetaData.setUploadDate(new Date());
         userFileMetaData.setUser(user);
         userFileRepository.save(userFileMetaData);

         return "File uploaded successfully. File URL: " + fileUrl;
     }
    

    /**
     * Creates a new folder for the specified user.
     * 
     * @param folderName The name of the new folder to create.
     * @param userId     The ID of the user who owns the folder.
     * @return           A success message indicating the folder has been created.
     */
    public String createFolder(String folderName, Long userId) {
        // Find the user based on the unique ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if a folder with the same name already exists for the user
        boolean folderExists = folderRepository.existsByNameAndUser_Id(folderName, userId);
        if (folderExists) {
            throw new RuntimeException("Folder with the same name already exists");
        }

        // Create and save the new folder
        Folder folder = new Folder(folderName, user);
        folderRepository.save(folder);

        return "Folder '" + folderName + "' created successfully";
    }

    /**
     * Retrieves all files associated with a specific user.
     * 
     * @param userId the UUID of the user whose files are being retrieved.
     * @return a list of UserFile entities belonging to the specified user.
     */

    
    public List<FileResponse> getAllFilesByUserId(Long userId) {

        // Get all of the users files
        List<UserFileMetaData> userFiles = userFileRepository.findByUser_Id(userId);

        // Generate file URLS using StorageService
        return userFiles.stream().map(file -> {
            // Retrieve the forle from s3
            String fileUrl = storageService.getFileUrl(file.getS3Key());
            String folderName = file.getFolder() != null ? file.getFolder().getName() : "";

            return new FileResponse(file.getFileId(), file.getFileName(), fileUrl, file.getFileType(),
                    file.getFileSize(), folderName);
        }).collect(Collectors.toList());
    }


    // Retrieves all of the clients folders
    public List<FolderWithFilesResponse> getAllFoldersByUserId(Long userId) {

        List<Folder> userFolders = folderRepository.findByUser_Id(userId);

        // Iterate through each folder and get the files associated with it
        List<FolderWithFilesResponse> folderWithFilesResponses = userFolders.stream()
                .map(folder -> {
                    // Get all files for the current folder
                    List<UserFileMetaData> folderFiles = userFileRepository.findByFolder_Id(folder.getId());

                    // Generate file URLs and gather file information, including folder name
                    List<FileResponse> fileResponses = folderFiles.stream().map(file -> {
                        String fileUrl = storageService.getFileUrl(file.getS3Key());
                        return new FileResponse(file.getFileId(), file.getFileName(), fileUrl, file.getFileType(),
                                file.getFileSize(), folder.getName());
                    }).collect(Collectors.toList());

                    // Create a response object for the folder with the associated files
                    return new FolderWithFilesResponse(folder.getId(), folder.getName(), fileResponses);
                })
                .collect(Collectors.toList()); // Collect results into a List

        return folderWithFilesResponses;
    }


    // Deletes specific file for user
    public ResponseEntity<String> deleteFile(Long userId, String fileName, Long folderId) {

        try {

            Optional<UserFileMetaData> file;

            if (folderId == null) {
                file = userFileRepository.findByUser_IdAndFileNameAndFolderName(userId, fileName,
                        "Default Folder");

            } else {
                // See if the file exists
                file = userFileRepository.findByUser_IdAndFileNameAndFolder_Id(userId, fileName,
                        folderId);
            }

            if (file.isPresent()) {

                // Retrieving the file
                UserFileMetaData userFile = file.get();

                // Retrieving the unique s3 key
                String s3_key = userFile.getS3Key();

                // Deleting the file from S3 Storage
                storageService.deleteFile(s3_key);

                // Delete from File and Folder Table
                userFileRepository.delete(userFile);

                // Delete from S3
                return ResponseEntity.status(200).body("File deleted successfully");

            } else {
                return ResponseEntity.status(404).body("File not found");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    

    // Deletes a specified folder for a user
    public ResponseEntity<String> deleteFolder(Long userId, Long folderId) {

        try {
            // See if the folder exists
            Optional<Folder> folder = folderRepository.findByUser_IdAndId(userId, folderId);

            if (folder.isPresent()) {
                Folder folderToDelete = folder.get();

                // Deleting the folder
                userFileRepository.deleteByFolder_Id(folderId);
                folderRepository.delete(folderToDelete);
                return ResponseEntity.status(200).body("Folder and all associated files deleted successfully");
            } else {
                // Folder does not exist
                return ResponseEntity.status(404).body("Folder not found");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    

    public ResponseEntity<String> renameFolder(Long userId, Long folderId, String newName) {

        try {
            // See if the folder exists
            Optional<Folder> folder = folderRepository.findByUser_IdAndId(userId, folderId);

            if (folder.isPresent()) {
                Folder newFolder = folder.get();
                newFolder.setName(newName);
                folderRepository.save(newFolder);
                return ResponseEntity.ok("Folder name updated successfully");

            } else {
                return ResponseEntity.status(404).body("Folder not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Folder was not found " + e.getMessage());
        }
    }

    public ResponseEntity<String> renameFile(Long userId, Long fileId, String newName) {

        try {
            // See if the file exists
            Optional<UserFileMetaData> file = userFileRepository.findByUser_IdAndFileId(userId, fileId);

            if (file.isPresent()) {
                UserFileMetaData newFile = file.get();
                newFile.setFileName(newName);
                userFileRepository.save(newFile);
                return ResponseEntity.ok("File name updated successfully");

            } else {
                return ResponseEntity.status(404).body("File not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("File was not found " + e.getMessage());
        }
    }
}