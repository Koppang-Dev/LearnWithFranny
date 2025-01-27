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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

        // Saving the file information in s3 storage
        String fileUrl = storageService.uploadFile(file);

        // Find the user based on the unique ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
            // Find the default folder for the user (or create one if it doesn't exist)
        Optional<Folder> optionalFolder = folderRepository.findDefaultFolderByUserId(userId);
        Folder folderToUse;

        // If no default folder exists, create one and assign it to folderToUse
        if (optionalFolder.isPresent()) {
            folderToUse = optionalFolder.get();
        } else {
            // No default folder, so create a new one
            folderToUse = new Folder("Default Folder", user);
            folderRepository.save(folderToUse); // Save the new default folder
        }

        // Saving the file metadata
        UserFileMetaData userFileMetaData = new UserFileMetaData();
        userFileMetaData.setFolder(folderToUse);
        userFileMetaData.setFileName(fileName);
        userFileMetaData.setS3Key(fileUrl);
        userFileMetaData.setFileType(file.getContentType());
        userFileMetaData.setFileSize(file.getSize());
        userFileMetaData.setUploadDate(new Date());
        userFileMetaData.setUser(user);
        userFileRepository.save(userFileMetaData);


        return "File uploaded successfully. File URL: " + fileUrl;
    }

    // /**
    //  * Retrieves all files associated with a specific user.
    //  * 
    //  * @param userId the UUID of the user whose files are being retrieved.
    //  * @return a list of UserFile entities belonging to the specified user.
    //  */

    
    // public List<FileResponse> getAllFilesByUserId(Long userId) {

    //     // Get all of the users files
    //     List<UserFileMetaData> userFiles = userFileRepository.findByUser_Id(userId);

    //     // Generate file URLS using StorageService
    //     return userFiles.stream().map(file -> {
    //         // Retrieve the forle from s3
    //         String fileUrl = storageService.getFileUrl(file.getS3Key());
    //         return new FileResponse(file.getFileId(), file.getFileName(), fileUrl, file.getFileType(),
    //                 file.getFileSize());
    //     }).collect(Collectors.toList());
    // }


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
                return new FileResponse(file.getFileId(), file.getFileName(), fileUrl, file.getFileType(), file.getFileSize(), folder.getName());
            }).collect(Collectors.toList());

            // Create a response object for the folder with the associated files
            return new FolderWithFilesResponse(folder.getId(), folder.getName(), fileResponses);
        })
        .collect(Collectors.toList()); // Collect results into a List

    return folderWithFilesResponses;
}
}