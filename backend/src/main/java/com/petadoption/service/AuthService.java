package com.petadoption.service;

import com.petadoption.entity.User;
import com.petadoption.repository.UserRepository;
import com.petadoption.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ SIGNUP (NO OTP LOGIC HERE)
    public Map<String, Object> signup(String name, String email, String password) {
        Map<String, Object> response = new HashMap<>();
        User u = userRepository.findByEmail(email).get();
        if (userRepository.findByEmail(email).isPresent()) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        return Map.of(
                "id", u.getId(),
                "name", u.getName(),
                "email", u.getEmail(),
                "token", jwtUtil.generateToken(email, "USER")
        );
    }

    // (Optional) login logic if you want service-based login later
    public Map<String, Object> login(String email, String password) {
        Map<String, Object> response = new HashMap<>();
        User u = userRepository.findByEmail(email).get();

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        return Map.of(
                "id", u.getId(),
                "name", u.getName(),
                "email", u.getEmail(),
                "token", jwtUtil.generateToken(email, "USER")
        );
    }
}
