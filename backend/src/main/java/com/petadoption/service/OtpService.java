package com.petadoption.service;

import com.petadoption.entity.OtpVerification;
import com.petadoption.repository.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email) {
        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        OtpVerification entity = new OtpVerification();
        entity.setEmail(email);
        entity.setOtp(otp);
        entity.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(entity);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Your OTP for Pet Adoption App");
        msg.setText("Your OTP is: " + otp + "\nValid for 5 minutes.");

        mailSender.send(msg);
    }

    @Transactional
    public boolean verifyOtp(String email, String otp) {
        return otpRepository.findTopByEmailOrderByIdDesc(email)
                .filter(o -> o.getOtp().equals(otp))
                .filter(o -> o.getExpiryTime().isAfter(LocalDateTime.now()))
                .map(o -> {
                    otpRepository.deleteByEmail(email);
                    return true;
                })
                .orElse(false);
    }

}
