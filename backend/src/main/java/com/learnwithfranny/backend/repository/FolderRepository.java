package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.Folder;

import io.lettuce.core.dynamic.annotation.Param;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    Optional<Folder> findByUserIdAndName(Long userId, String name);

    Optional<Folder> findByUser_IdAndId(Long userId, Long folderId);

    // Find all folders for a specific user
    List<Folder> findByUser_Id(Long userId);

    // Check if the folder already exists
    Boolean existsByNameAndUser_Id(String folderName, Long userId);
}
