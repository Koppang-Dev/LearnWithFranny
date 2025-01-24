package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.dto.FileResponse;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.UserFileMetaData;
import com.learnwithfranny.backend.repository.UserFileRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public UserFileService(UserFileRepository userFileRepository, StorageService storageService, UserRepository userRepository) {
        this.userFileRepository = userFileRepository;
        this.storageService = storageService;
        this.userRepository = userRepository;
    }



     /**
     * Saves metadata of a file uploaded by a user to the database.
     * 
     * @param fileName the original name of the uploaded file.
     * @param s3Key the unique key used to store the file in Amazon S3.
     * @param fileType the MIME type of the file (e.g., "application/pdf", "image/png").
     * @param fileSize the size of the file in bytes.
     * @param user the user who uploaded the file (foreign key reference).
     * @return the saved UserFile entity with generated ID and timestamp.
     */
     public String saveFile(MultipartFile file, Long userId) {

        // Saving the file information in s3 storage
        String fileUrl = storageService.uploadFile(file);

        // Find the user based on the unique ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Saving the file metadata
        UserFileMetaData userFileMetaData = new UserFileMetaData();
        userFileMetaData.setUser(user);
        userFileMetaData.setFileName(file.getOriginalFilename());
        userFileMetaData.setS3Key(fileUrl);
        userFileMetaData.setFileType(file.getContentType());
        userFileMetaData.setFileSize(file.getSize());
        userFileMetaData.setUploadDate(new Date());
        userFileMetaData.setUser(user);
        userFileRepository.save(userFileMetaData);


        return "File uploaded successfully. File URL: " + fileUrl;
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
        return userFiles.stream().map(file-> {
            // Retrieve the forle from s3
            String fileUrl = storageService.getFileUrl(file.getS3Key());
            return new FileResponse(file.getFileName(), fileUrl, file.getFileType(), file.getFileSize());
        }).collect(Collectors.toList());
        

    }

    
}
