package com.learnwithfranny.backend.dto;

public class FileResponse {
    private Long fileId;
    private String fileName;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private String folderName;
    private Long folderId;

    // Updated constructor
    public FileResponse(Long id, String fileName, String fileUrl, String fileType, Long fileSize, String folderName, Long folderId) {
        this.fileId = id;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.folderName = folderName;
        this.folderId = folderId;

    }

    // Getters and setters for the new folderName field
    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    // Existing getters and setters
    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long id) {
        this.fileId = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long id) {
        this.folderId = id;
    }
}
