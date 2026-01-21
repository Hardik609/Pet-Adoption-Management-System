package com.petadoption.controller;

import com.petadoption.entity.Admin;
import com.petadoption.repository.AdminRepository;
import com.petadoption.security.JwtUtil; // ← ADDED

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api-auth") // matches your working path
@CrossOrigin
public class AdminAuthController {

        private static final Logger logger = LoggerFactory.getLogger(AdminAuthController.class);

        private final AdminRepository adminRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtUtil jwtUtil; // ← ADDED

        public AdminAuthController(
                        AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder,
                        JwtUtil jwtUtil // ← ADDED
        ) {
                this.adminRepository = adminRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtUtil = jwtUtil; // ← ADDED
        }

        // =================== REAL LOGIN ===================
        @PostMapping("/login")
        public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> request) {

                try {
                        String email = request.get("email");
                        String password = request.get("password");

                        logger.info("Admin login attempt for: {}", email);

                        // ---- VALIDATION ----
                        if (email == null || password == null ||
                                        email.isBlank() || password.isBlank()) {

                                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                                .body(Map.of(
                                                                "success", false,
                                                                "message", "Email and password required"));
                        }

                        // ---- FIND ADMIN ----
                        Optional<Admin> adminOpt = adminRepository.findByEmail(email);

                        if (adminOpt.isEmpty()) {
                                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                                .body(Map.of(
                                                                "success", false,
                                                                "message", "Invalid credentials"));
                        }

                        Admin admin = adminOpt.get();

                        // ---- PASSWORD CHECK ----
                        boolean passwordMatches = passwordEncoder.matches(
                                        password,
                                        admin.getPasswordHash());

                        logger.info("Password match result: {}", passwordMatches);

                        if (!passwordMatches) {
                                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                                .body(Map.of(
                                                                "success", false,
                                                                "message", "Invalid credentials"));
                        }

                        // =================== JWT TOKEN CREATION ===================
                        String token = jwtUtil.generateToken(
                                        admin.getEmail(),
                                        admin.getRole());
                        // ===========================================================

                        // ---- SUCCESS RESPONSE WITH TOKEN ----
                        return ResponseEntity.ok(Map.of(
                                        "success", true,
                                        "message", "Login successful",

                                        // ✔ FRONTEND WILL USE THIS TOKEN
                                        "token", token,

                                        "admin", Map.of(
                                                        "id", admin.getAdminId(),
                                                        "name", admin.getName(),
                                                        "email", admin.getEmail(),
                                                        "role", admin.getRole())));

                } catch (Exception e) {

                        logger.error("Login error: ", e);

                        return ResponseEntity.status(
                                        HttpStatus.INTERNAL_SERVER_ERROR).body(
                                                        Map.of(
                                                                        "success", false,
                                                                        "message", "Server error during login"));
                }
        }

        // ========== OPTIONAL TEST ENDPOINT (DEV ONLY) ==========
        @PostMapping("/test-encoder")
        public ResponseEntity<?> testEncoder(
                        @RequestBody Map<String, String> req) {

                String raw = req.get("password");
                String hash = req.get("hash");

                boolean result = passwordEncoder.matches(raw, hash);

                return ResponseEntity.ok(Map.of(
                                "match", result));
        }
}
