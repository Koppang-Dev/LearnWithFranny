package com.learnwithfranny.backend.repository;
import com.learnwithfranny.backend.model.Folder;
import com.learnwithfranny.backend.model.UserFileMetaData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFileRepository extends JpaRepository<UserFileMetaData, Long> {

    // Find all files for a specific user
    List<UserFileMetaData> findByUser_Id(Long userId);

    List<UserFileMetaData> findByFolder_Id(Long folderId);
    
    // Find a specific file by the users id, the file name and the folderI
    Optional<UserFileMetaData> findByUser_IdAndFileNameAndFolder_Id(Long userId, String fileName, Long folderId);

}
