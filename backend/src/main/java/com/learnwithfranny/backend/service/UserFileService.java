package com.learnwithfranny.backend.service;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.model.UserFile;
import com.learnwithfranny.backend.repository.UserFileRepository;

import java.util.List;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;


/**
 * Service class to handle business logic related to user files.
 * This includes operations such as saving file metadata and retrieving user files.
 */
@Service
public class UserFileService {
    private final UserFileRepository userFileRepository;

    public UserFileService(UserFileRepository userFileRepository) {
        this.userFileRepository = userFileRepository;
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
    public UserFile saveFileMetadata(String fileName, String s3Key, String fileType, Long fileSize, User user) {
        // Saving the file information
        UserFile userFile = new UserFile();
        userFile.setFileName(fileName);
        userFile.setS3Key(s3Key);
        userFile.setFileType(fileType);
        userFile.setFileSize(fileSize);
        userFile.setUploadDate(new Date());
        userFile.setUser(user);
        return userFileRepository.save(userFile);
    }

       /**
     * Retrieves all files associated with a specific user.
     * 
     * @param userId the UUID of the user whose files are being retrieved.
     * @return a list of UserFile entities belonging to the specified user.
     */
      public List<UserFile> getAllFilesByUserId(Long userId) {
        return userFileRepository.findByUser_UserId(userId);
    }

    
}
