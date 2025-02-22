package com.learnwithfranny.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * The User entity represents a user in the system.
 * It is mapped to the "users" table in the database.
 * This class stores user-specific information such as username, email, password,
 * and associated roles.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    // Users primary key id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

     // Users Name
     @Column(name = "name")
     private String name;
 

    // Users username
    @Column(name = "username")
    private String username;

    // Users email
    @Column(name = "email")
    private String email;

    // Users password
    @Column(name = "password")
    private String password;

    // Users profile picture
    @Column(name = "profilePictureUrl", nullable = true)
    private String profilePictureUrl;

    // Users saved language
    @Column(name = "language", nullable = true)
    private String language;

    // Users saved DateFormat
    @Column(name = "dateFormat")
    private String dateFormat;

    // Users saved time zone
    @Column(name = "timeZone")
    private String timeZone;

    // User can have many decks
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Deck> decks;

    /**
     * The roles associated with the user.
     * This is a many-to-many relationship with the Role entity.
     * The roles are fetched eagerly, meaning they are loaded immediately with the user.
     * The relationship is represented by the "users_to_roles" join table.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_to_roles",
        joinColumns = @JoinColumn(name="user_id"),
        inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles = new HashSet<>();

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }


    // Setters and Getters
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public String getDateFormat() {
        return dateFormat;
    }

}
