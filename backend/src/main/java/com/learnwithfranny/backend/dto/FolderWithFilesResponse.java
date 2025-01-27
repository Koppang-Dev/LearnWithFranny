package com.learnwithfranny.backend.dto;

import java.util.List;

public class FolderWithFilesResponse {
    private Long folderId;
    private String folderName;
    private List<FileResponse> files; // List of files in the folder

    public FolderWithFilesResponse(Long folderId, String folderName, List<FileResponse> files) {
        this.folderId = folderId;
        this.folderName = folderName;
        this.files = files;
    }

    // Getters and setters
    public Long getFolderId() {
        return folderId;
    }

    public void setFolderId(Long folderId) {
        this.folderId = folderId;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public List<FileResponse> getFiles() {
        return files;
    }

    public void setFiles(List<FileResponse> files) {
        this.files = files;
    }
}

