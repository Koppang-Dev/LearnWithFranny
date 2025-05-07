package com.learnwithfranny.backend.service;

import com.learnwithfranny.backend.model.NotificationPreferences;
import com.learnwithfranny.backend.model.User;
import com.learnwithfranny.backend.repository.NotificationPreferencesRepository;
import com.learnwithfranny.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Map;

@Service
public class NotificationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationPreferencesRepository notificationPreferencesRepository;

     // Constants for preference keys
     private static final String EMAIL_NEWS = "emailNews";
     private static final String EMAIL_UPDATES = "emailUpdates";
     private static final String EMAIL_REMINDERS = "emailReminders";
     private static final String PUSH_NEWS = "pushNews";
     private static final String PUSH_UPDATES = "pushUpdates";
     private static final String PUSH_REMINDERS = "pushReminders";
     private static final String NOTIFICATION_FREQUENCY = "notificationFrequency";

    // Getting the current users Notification preferecnes
    private NotificationPreferences getCurrentUsNotificationPreferences() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with that username"));
        
        // Returning the notification preferences
        return notificationPreferencesRepository.findByUser(user)
                .orElseGet(() -> {
                    NotificationPreferences defaults = new NotificationPreferences();
                    defaults.setUser(user);
                    return notificationPreferencesRepository.save(defaults);
                });
        
    }

    // Getting Notification preferences
    public Map<String, Object> getNotificationPreferences() {

        // Getting notification preferences of the user
        NotificationPreferences notificationPreferences = getCurrentUsNotificationPreferences();

        // Returning the preferences
        return Map.of(
                EMAIL_NEWS, notificationPreferences.isEmailNews(),
                EMAIL_UPDATES, notificationPreferences.isEmailUpdates(),
                EMAIL_REMINDERS, notificationPreferences.isEmailReminders(),
                PUSH_NEWS, notificationPreferences.isPushNews(),
                PUSH_UPDATES, notificationPreferences.isPushUpdates(),
                PUSH_REMINDERS, notificationPreferences.isPushReminders(),
                NOTIFICATION_FREQUENCY, notificationPreferences.getNotificationFrequency());
    }
    

    // Updating Notification Preferences
    public void updateAllNotificationPreferences(Map<String, Object> preferences) {
        Assert.notNull(preferences, "Preferences map cannot be null");
        NotificationPreferences notificationPreferences = getCurrentUsNotificationPreferences();
        updatePreferencesFromMap(notificationPreferences, preferences);

        notificationPreferencesRepository.save(notificationPreferences);
    }
    
    // Updating the users notifications preferences from the given Map
    private void updatePreferencesFromMap(NotificationPreferences notificationPreferences, Map<String, Object> preferences) {
        notificationPreferences.setEmailNews((Boolean) preferences.getOrDefault(EMAIL_NEWS, false));
        notificationPreferences.setEmailUpdates((Boolean) preferences.getOrDefault(EMAIL_UPDATES, false));
        notificationPreferences.setEmailReminders((Boolean) preferences.getOrDefault(EMAIL_REMINDERS, false));
        notificationPreferences.setPushNews((Boolean) preferences.getOrDefault(PUSH_NEWS, false));
        notificationPreferences.setPushUpdates((Boolean) preferences.getOrDefault(PUSH_UPDATES, false));
        notificationPreferences.setPushReminders((Boolean) preferences.getOrDefault(PUSH_REMINDERS, false));
        notificationPreferences.setNotificationFrequency((String) preferences.getOrDefault(NOTIFICATION_FREQUENCY, "daily"));
    }

    
}
