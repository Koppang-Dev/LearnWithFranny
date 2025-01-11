package com.learnwithfranny.backend.repository;

import com.learnwithfranny.backend.model.ERole;
import com.learnwithfranny.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
