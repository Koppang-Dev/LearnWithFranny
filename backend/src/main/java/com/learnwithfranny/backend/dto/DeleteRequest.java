package com.learnwithfranny.backend.dto;

public class DeleteRequest {
    private Long userId;
    private String fileName;
    private Long folderId;

    // Getter for userId
    public Long getUserId() {
        return userId;
    }

    // Setter for userId
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter for fileName
    public String getFileName() {
        return fileName;
    }

    // Setter for fileName
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    // Getter for folderId
    public Long getFolderId() {
        return folderId;
    }

    // Setter for folderId
    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }
}
