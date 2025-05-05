package com.learnwithfranny.backend.service;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GeoLocationService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String resolveLocation(String ipAddress) {
        try {
            String url = "http://ip-api.com/json/" + ipAddress;
            Map<?, ?> response = restTemplate.getForObject(url, Map.class);

            if (response != null && "success".equals(response.get("status"))) {
                String city = (String) response.get("city");
                String country = (String) response.get("country");
                return city + ", " + country;
            }
        } catch (Exception e) {
            return "Unknown";
        }
        return "Unknown";
    }
}