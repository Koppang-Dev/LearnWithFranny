package com.learnwithfranny.backend.model;

import jakarta.persistence.*;

import java.util.List;
@Entity
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL)
    private List<UserFileMetaData> files;  

    public Folder() {}

    public Folder(String name, User user) {
        this.name = name;
        this.user = user;
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
