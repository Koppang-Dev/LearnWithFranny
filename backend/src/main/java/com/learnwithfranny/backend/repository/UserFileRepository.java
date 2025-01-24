package com.learnwithfranny.backend.repository;
import com.learnwithfranny.backend.model.UserFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFileRepository extends JpaRepository<UserFile, Long> {

    // Find all files for a specific user
    List<UserFile> findByUser_UserId(Long userId);
    
}
