package com.learnwithfranny.backend.model;

import jakarta.persistence.*;

/**
 * The Role entity represents a user role in the system.
 * It is mapped to the "roles" table in the database.
 * This class is used to define roles such as USER, ADMIN, or MODERATOR.
 */
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column
    private ERole name;

    /**
     * Getter method for retrieving the name of the role.
     * 
     * @return The name of the role as an ERole enum value.
     */
    public ERole getName()
    {
        return name;
    }    
}
