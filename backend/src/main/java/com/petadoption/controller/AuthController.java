package com.petadoption.controller;

import com.petadoption.entity.User;
import com.petadoption.repository.UserRepository;
import com.petadoption.security.JwtUtil;
import com.petadoption.service.AuthService;
import com.petadoption.service.OtpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String, String> req) {

        String name = req.get("name");
        String email = req.get("email");
        String password = req.get("password");
        String otp = req.get("otp");

        Map<String, Object> response = new HashMap<>();

        boolean otpValid = otpService.verifyOtp(email, otp);
        if (!otpValid) {
            response.put("success", false);
            response.put("message", "Invalid or expired OTP");
            return response;
        }

        return authService.signup(name, email, password);
    }

    // ================= USER LOGIN =================
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String password = req.get("password");

        Map<String, Object> response = new HashMap<>();

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return response;
        }

        User user = userOptional.get();

        // 🔥 BCrypt verification
        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid password");
            return response;
        }

        // 🔥 JWT MUST USE EMAIL + ROLE (this was the bug)
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        response.put("success", true);
        response.put("token", token);

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("name", user.getName());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());

        response.put("user", userData);

        return response;
    }
}

/*
 * package com.petadoption.controller;
 * 
 * import org.springframework.context.annotation.Bean;
 * import org.springframework.context.annotation.Configuration;
 * import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.web.SecurityFilterChain;
 * import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
 * import org.springframework.web.cors.CorsConfiguration;
 * import org.springframework.web.cors.CorsConfigurationSource;
 * import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
 * 
 * import java.util.List;
 * 
 * @Configuration
 * public class SecurityConfig {
 * 
 * // 🔓 SECURITY COMPLETELY DISABLED
 * 
 * @Bean
 * public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
 * 
 * http
 * .cors().configurationSource(corsConfigurationSource())
 * .and()
 * .csrf().disable()
 * .authorizeHttpRequests(auth -> auth
 * .anyRequest().permitAll() // ✅ ALLOW EVERYTHING
 * );
 * 
 * return http.build();
 * }
 * 
 * // 🔐 Password encoder still needed for login/signup logic
 * 
 * @Bean
 * public BCryptPasswordEncoder passwordEncoder() {
 * return new BCryptPasswordEncoder();
 * }
 * 
 * // 🌐 CORS config for React frontend
 * 
 * @Bean
 * public CorsConfigurationSource corsConfigurationSource() {
 * CorsConfiguration config = new CorsConfiguration();
 * config.setAllowedOrigins(List.of("http://localhost:5173"));
 * config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
 * config.setAllowedHeaders(List.of("*"));
 * config.setAllowCredentials(true);
 * 
 * UrlBasedCorsConfigurationSource source = new
 * UrlBasedCorsConfigurationSource();
 * source.registerCorsConfiguration("/**", config);
 * return source;
 * }
 * }
 */

/*
 * package com.petadoption.controller;
 * 
 * import com.petadoption.service.AuthService;
 * import org.springframework.beans.factory.annotation.Autowired;
 * import org.springframework.web.bind.annotation.*;
 * 
 * import java.util.Map;
 * 
 * @RestController
 * 
 * @CrossOrigin(origins = "http://localhost:5173")
 * 
 * @RequestMapping("/api/auth")
 * public class AuthController {
 * 
 * @Autowired
 * private AuthService service;
 * 
 * @PostMapping("/signup")
 * public Map<String, Object> signup(@RequestBody Map<String, String> req) {
 * return service.signup(req.get("name"), req.get("email"),
 * req.get("password"));
 * }
 * 
 * @PostMapping("/login")
 * public Map<String, Object> login(@RequestBody Map<String, String> req) {
 * return service.login(req.get("email"), req.get("password"));
 * }
 * }
 */
