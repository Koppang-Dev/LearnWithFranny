package com.learnwithfranny.backend.repository;
import com.learnwithfranny.backend.model.UserFileMetaData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFileRepository extends JpaRepository<UserFileMetaData, Long> {

    // Find all files for a specific user
    List<UserFileMetaData> findByUser_Id(Long userId);
    
}
