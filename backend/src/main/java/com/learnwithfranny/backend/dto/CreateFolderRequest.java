package com.learnwithfranny.backend.dto;

/**
 * Data Transfer Object (DTO) for creating a folder.
 */
public class CreateFolderRequest {

    private String folderName;
    private Long userId;
    private Long parentFolderId;

    // Constructor
    public CreateFolderRequest(String folderName, Long userId, Long parentFolderId) {
        this.folderName = folderName;
        this.userId = userId;
        this.parentFolderId = parentFolderId;
    }

    // Getters and Setters
    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getParentFolderId() {
        return parentFolderId;
    }

    public void setParentFolderId(Long parentFolderId) {
        this.parentFolderId = parentFolderId;
    }
}
