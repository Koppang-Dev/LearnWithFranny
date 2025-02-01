package com.learnwithfranny.backend.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StorageService {

    @Value("${application.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    // Uploading a file
    public String uploadFile(MultipartFile file, String uniqueFileName) {

        // Transforming file 
        File fileObj = convertMultiPartFileToFile(file);

        // Creating unique file name

        // Uploads a new object to the specified amazon bucket
        s3Client.putObject(new PutObjectRequest(bucketName, uniqueFileName, fileObj));

        // Deleting file after uploaded to S3 bucket
        fileObj.delete();

        return "File uploaded: " + uniqueFileName;
    }
    

    // Downloading a file
    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();

        // Convert string to byte array
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            log.error("Failed to download file from S3 storage", e);
            return null;
        }
    }

    // Converts Multipart file to regular file
    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartfile to file", e);
        }
        return convertedFile;
    }

    // Deleting a file from S3 Bucket
    public String deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
        return fileName + "removed";
    }

    // Retrieve a file URL from S3
    // TODO: Figure out if this can be a unique identifier
    public String getFileUrl(String s3Key) {
        return s3Client.getUrl(bucketName, s3Key).toString();
    }

    public String generatePreSignedUrl(String fileName) {
        // Setting expiration time for the URL (5 minutes in this case)
        java.util.Date expiration = new java.util.Date(System.currentTimeMillis() + 1000 * 60 * 5);
        // Generating the pre-signed URL
        return s3Client.generatePresignedUrl(bucketName, fileName, expiration).toString();
    }
    
} 
