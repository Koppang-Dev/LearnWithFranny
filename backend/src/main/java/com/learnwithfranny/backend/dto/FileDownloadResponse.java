package com.learnwithfranny.backend.dto;

public class FileDownloadResponse {
    private byte[] data;
    private String fileName;

    // Constructor
    public FileDownloadResponse(byte[] data, String fileName) {
        this.data = data;
        this.fileName = fileName;
    }

    // Getters
    public byte[] getData() {
        return data;
    }

    public String getFileName() {
        return fileName;
    }
}

