package com.learnwithfranny.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.from}")
    private String from;

    public void sendPasswordResetEmail(String to, String resetLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject("Reset Your Password");

            String htmlContent = buildResetEmailHtml(resetLink);
            helper.setText(htmlContent, true); // true = HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send reset email", e);
        }
    }

    private String buildResetEmailHtml(String resetLink) {
        return """
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
                <h2 style="color: #222A68;">Reset Your Password</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the button below to reset it:</p>
                <a href="%s" style="display:inline-block;padding:12px 24px;background-color:#222A68;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
                <p style="margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
                <hr style="margin-top: 30px;" />
                <p style="font-size: 12px; color: #999;">– The LearnWithFranny Team</p>
            </div>
        """.formatted(resetLink);
    }
}
