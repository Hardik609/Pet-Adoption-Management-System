package com.petadoption.service;

import com.petadoption.entity.User;
import com.petadoption.repository.UserRepository;
import com.petadoption.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> signup(String name, String email, String password) {
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(encoder.encode(password));
        repo.save(u);

        return Map.of(
                "id", u.getId(),
                "name", u.getName(),
                "email", u.getEmail(),
                "token", jwtUtil.generateToken(email)
        );
    }

    public Map<String, Object> login(String email, String password) {
        User u = repo.findByEmail(email).orElseThrow();

        if (!encoder.matches(password, u.getPassword()))
            throw new RuntimeException("Invalid credentials");

        return Map.of(
                "id", u.getId(),
                "name", u.getName(),
                "email", u.getEmail(),
                "token", jwtUtil.generateToken(email)
        );
    }
}
