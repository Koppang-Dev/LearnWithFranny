package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    /**
     * Finds a default folder for a specific user.
     * This method assumes the default folder is uniquely identifiable per user.
     *
     * @param user The user whose default folder is being queried.
     * @return An Optional containing the default folder if found, otherwise empty.
     */
    Optional<Folder> findDefaultFolderByUserId(Long userId);

    // Find all folders for a specific user
    List<Folder> findByUser_Id(Long userId);

    // Check if the folder already exists
    Boolean existsByNameAndUser_Id(String folderName, Long userId);
}
