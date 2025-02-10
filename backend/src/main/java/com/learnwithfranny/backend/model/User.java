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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String email;

    @Column
    private String password;

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
}
