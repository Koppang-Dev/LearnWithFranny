package com.learnwithfranny.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.learnwithfranny.backend.service.PreferencesService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/preferences")

public class PreferencesController {

    @Autowired
    private PreferencesService preferencesService;

    // Getting the users preferences
    @GetMapping
    public ResponseEntity<Map<String, String>> getPreferences() {
        Map<String, String> preferences = preferencesService.getPreferences();
        return ResponseEntity.ok(preferences);
    }

    // Updating the users language preference
    @PostMapping("/update-language")
    public ResponseEntity<String> updateLanguage(@RequestBody Map<String, String> request) {
        String language = request.get("language");
        preferencesService.updateLanguage(language);
        return ResponseEntity.ok("Language preference updated successfully");
    }

    // Updating users time-zone
    @PostMapping("/update-time-zone")
    public ResponseEntity<String> updateTimeZone(@RequestBody Map<String, String> request) {
        String timeZone = request.get("timeZone");
        preferencesService.updateTimeZone(timeZone);
        return ResponseEntity.ok("Time zone updated successfully");
    }

    // Updating the date format for user
    @PostMapping("/update-date-format")
    public ResponseEntity<String> updateDateFormat(@RequestBody Map<String, String> request) {
        String dateFormat = request.get("dateFormat");
        preferencesService.updateDateTime(dateFormat);
        return ResponseEntity.ok("Date format updated successfully");
    }    
}
