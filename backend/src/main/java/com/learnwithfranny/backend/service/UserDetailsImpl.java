package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Custom implementation of Spring Security's UserDetails interface.
 * This class represents the user details used for authentication and authorization within the system.
 */
public class UserDetailsImpl implements UserDetails {

    private Long id;
    private String username;
    private String email;

    // The password is annotated with @JsonIgnore to ensure it's not serialized in JSON responses
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    /**
     * Constructor for creating a UserDetailsImpl object.
     *
     * @param id           the user ID.
     * @param username     the username of the user.
     * @param email        the email of the user.
     * @param password     the password of the user (which is ignored during serialization).
     * @param authorities  a collection of granted authorities (roles or permissions) for the user.
     */
    public UserDetailsImpl(Long id, String username, String email, String password,
            Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

     /**
     * Static factory method to convert a User entity to a UserDetailsImpl.
     * This is used to build a UserDetailsImpl instance from a User object, which is typically loaded
     * from the database.
     *
     * @param user the User entity to convert to UserDetailsImpl.
     * @return a new instance of UserDetailsImpl.
     */
    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
        return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), authorities);
    }

    /**
     * Returns the authorities granted to the user.
     * Authorities typically represent the roles or permissions assigned to the user.
     *
     * @return a collection of GrantedAuthority objects.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /**
     * Returns the password used for authentication.
     *
     * @return the password of the user.
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Returns the username used for authentication.
     *
     * @return the username of the user.
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Returns the email used for authentication.
     *
     * @return the email of the user.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Indicates whether the user's account has expired.
     * In this implementation, the account is never considered expired.
     *
     * @return true if the account is not expired, false otherwise.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user's account is locked.
     * In this implementation, the account is never considered locked.
     *
     * @return true if the account is not locked, false otherwise.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials (password) have expired.
     * In this implementation, the credentials are never considered expired.
     *
     * @return true if the credentials are not expired, false otherwise.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled.
     * In this implementation, the user is always enabled.
     *
     * @return true if the user is enabled, false otherwise.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

      /**
     * Gets the user's ID.
     * This is not part of the UserDetails interface but is useful in many scenarios, such as logging or user management.
     *
     * @return the ID of the user.
     */
    public Long getId() {
        return id;
    }



    
}
