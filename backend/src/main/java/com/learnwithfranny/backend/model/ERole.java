package com.learnwithfranny.backend.model;

/**
 * Enum representing the different roles that a user can have in the system.
 * These roles define the level of access and permissions a user has.
 * 
 * - ROLE_USER: Regular users with basic access to the system.
 * - ROLE_ADMIN: Administrators with full control over the system.
 * - ROLE_MODERATOR: Users with elevated permissions for moderation tasks.
 */
public enum ERole {
    ROLE_USER,
    ROLE_ADMIN,
    ROLE_MODERATOR
}
