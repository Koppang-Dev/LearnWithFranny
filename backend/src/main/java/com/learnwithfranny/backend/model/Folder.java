package com.learnwithfranny.backend.model;
import jakarta.persistence.*;
import java.util.List;

/**
 * Represents a Folder in the file storage system.
 * Folders can be nested within each other to create a hierarchical structure.
 * Each folder is associated with a user and can contain multiple files.
 */
@Entity
public class Folder {

    // Unique identifier for the folder
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name of the folder
    @Column(name = "folder_name", nullable = false, length = 255)
    private String name;

    // User who owns the folder
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // List of files associated with this folder
    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL)
    private List<UserFileMetaData> files;
    
    // Parent folder (used for nesting folders inside other folders)
    // Can be null for root folders
    @ManyToOne
    @JoinColumn(name = "parent_folder_id", nullable = true)
    private Folder parentFolder;

    public Folder() {}

     /**
     * Constructs a Folder object with the specified name, user, and optional parent folder.
     *
     * @param name        the name of the folder
     * @param user        the user who owns the folder
     * @param parentFolder the parent folder, or null if it's a root folder
     */
    public Folder(String name, User user, Folder parentFolder) {
        this.name = name;
        this.user = user;
        this.parentFolder = parentFolder;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<UserFileMetaData> getFiles() {
        return files;
    }

    public void setFiles(List<UserFileMetaData> files) {
        this.files = files;
    }
}
