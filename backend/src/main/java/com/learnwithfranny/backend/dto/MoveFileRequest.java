package com.learnwithfranny.backend.dto;


public class MoveFileRequest {
    private Long userId;
    private Long fileId;
    private Long fromFolderId;
    private Long toFolderId;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getFileId() { return fileId; }
    public void setFileId(Long fileId) { this.fileId = fileId; }

    public Long getFromFolderId() { return fromFolderId; }
    public void setFromFolderId(Long fromFolderId) { this.fromFolderId = fromFolderId; }

    public Long getToFolderId() { return toFolderId; }
    public void setToFolderId(Long toFolderId) { this.toFolderId = toFolderId; }
}
