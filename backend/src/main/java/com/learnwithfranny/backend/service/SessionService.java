package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.Session;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.SessionRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.aspectj.apache.bcel.classfile.Module.Uses;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final DeviceParserService deviceParserService;
    private final GeoLocationService geoLocationService;
    private final UserService userService;

    public SessionService(SessionRepository sessionRepository, DeviceParserService deviceParserService, GeoLocationService geoLocationService, UserService userService) {
        this.sessionRepository = sessionRepository;
        this.deviceParserService = deviceParserService;
        this.geoLocationService = geoLocationService;
        this.userService = userService;
    }

    // Creating a new sesssion from a requestion - OAuth or Manual
    public Session createSessionFromRequest(User user, HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        String ipAddress = request.getRemoteAddr();
        String deviceName = deviceParserService.getDeviceName(userAgent);
        String location = geoLocationService.resolveLocation(ipAddress);
        Session session = new Session(user, deviceName, ipAddress);
        session.setLocation(location);
        return sessionRepository.save(session);
    }

    // Create a new session
    public Session createSession(User user, String deviceName, String ipAddress) {
        Session session = new Session(user, deviceName, ipAddress);
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
    public void revokeAllSessions() {
        User user = userService.getCurrentUser();

        List<Session> sessions = sessionRepository.findByUser(user);
        for (Session session : sessions) {
            session.setRevoked(true);
            session.setLastActiveAt(LocalDateTime.now());
        }
        sessionRepository.saveAll(sessions);
    }
}
