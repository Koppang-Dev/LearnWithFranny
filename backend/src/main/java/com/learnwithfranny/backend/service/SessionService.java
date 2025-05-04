package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.Session;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    // Create a new session
    public Session createSession(User user, String userAgent, String ipAddress) {
        Session session = new Session(user, userAgent, ipAddress);
        return sessionRepository.save(session);
    }

    // Get all active sessions for a user
    public List<Session> getSessionsByUserId(User user) {
        return sessionRepository.findByUser(user).stream()
                .filter(session -> !session.isRevoked())
                .toList();
    }

    // Revoke a specific session
    public void revokeSession(UUID sessionId) {
        sessionRepository.findById(sessionId).ifPresent(session -> {
            session.setRevoked(true);
            session.setLastActiveAt(LocalDateTime.now());
            sessionRepository.save(session);
        });
    }

    // Revoke all sessions for a user
    public void revokeAllSessions(User user) {
        List<Session> sessions = sessionRepository.findByUser(user);
        for (Session session : sessions) {
            session.setRevoked(true);
            session.setLastActiveAt(LocalDateTime.now());
        }
        sessionRepository.saveAll(sessions);
    }
}
