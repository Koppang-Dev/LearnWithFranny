package com.learnwithfranny.backend.repository;
import com.learnwithfranny.backend.model.UserFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserFileRepository extends JpaRepository<UserFile, Long> {

    // Find all files for a specific user
    List<UserFile> findByUserId(UUID userId);
    
    
}
