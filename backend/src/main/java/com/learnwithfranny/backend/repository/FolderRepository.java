package com.learnwithfranny.backend.repository;
import com.learnwithfranny.backend.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repository interface for performing CRUD operations on Folder entities.
 * Extends JpaRepository to provide basic database interactions such as save, delete, and find.
 */
@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {


    /**
     * Finds a folder by the user ID and folder name.
     * 
     * @param userId the ID of the user
     * @param name the name of the folder
     * @return an Optional containing the found folder, or empty if no folder matches
     */
    Optional<Folder> findByUserIdAndName(Long userId, String name);

    /**
     * Finds a folder by the user ID and folder ID.
     * 
     * @param userId the ID of the user
     * @param folderId the ID of the folder
     * @return an Optional containing the found folder, or empty if no folder matches
     */
    Optional<Folder> findByUser_IdAndId(Long userId, Long folderId);

    /**
     * Finds all folders belonging to a specific user.
     * 
     * @param userId the ID of the user
     * @return a List of folders associated with the user
     */
    List<Folder> findByUser_Id(Long userId);

    /**
     * Checks if a folder with the specified name already exists for a specific user.
     * 
     * @param folderName the name of the folder
     * @param userId the ID of the user
     * @return true if the folder exists, false otherwise
     */
    Boolean existsByNameAndUser_Id(String folderName, Long userId);

    /**
     * Checks if a folder with the specified name already exists for the user 
     * within the given parent folder.
     * 
     * @param folderName   The name of the folder to check for existence.
     * @param userId       The ID of the user who owns the folder.
     * @param parentFolderId The ID of the parent folder where the folder is located.
     * @return             true if a folder with the same name exists for the user 
     *                     within the specified parent folder; false otherwise.
     */
    boolean existsByNameAndUser_IdAndParentFolder_Id(String folderName, Long userId, Long parentFolderId);


    /**
     * Checks if a folder with the specified name already exists for the user 
     * as a root-level folder (i.e., without a parent folder).
     * 
     * @param folderName   The name of the folder to check for existence.
     * @param userId       The ID of the user who owns the folder.
     * @return             true if a root-level folder with the same name exists 
     *                     for the user; false otherwise.
     */
    boolean existsByNameAndUser_IdAndParentFolderIsNull(String folderName, Long userId);

}
