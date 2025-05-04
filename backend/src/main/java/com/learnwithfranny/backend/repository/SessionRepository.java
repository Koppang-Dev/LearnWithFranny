package com.learnwithfranny.backend.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.learnwithfranny.backend.model.Session;
import com.learnwithfranny.backend.model.User;

@Repository
public interface SessionRepository extends JpaRepository<Session, UUID> {
    List<Session> findByUser(User user);
    void deleteByUser_Id(Long userId);
}
