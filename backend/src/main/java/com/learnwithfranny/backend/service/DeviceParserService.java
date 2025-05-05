package com.learnwithfranny.backend.service;


import org.springframework.stereotype.Component;

@Component
public class DeviceParserService {

    public String getDeviceName(String userAgent) {
        if (userAgent == null) return "Unknown Device";

        String device = "Unknown Device";
        if (userAgent.contains("iPhone")) device = "iPhone";
        else if (userAgent.contains("Android")) device = "Android";
        else if (userAgent.contains("Macintosh")) device = "Mac";
        else if (userAgent.contains("Windows")) device = "Windows PC";

        String browser = "Browser";
        if (userAgent.contains("Chrome")) browser = "Chrome";
        else if (userAgent.contains("Safari") && !userAgent.contains("Chrome")) browser = "Safari";
        else if (userAgent.contains("Firefox")) browser = "Firefox";

        return browser + " on " + device;
    }
}