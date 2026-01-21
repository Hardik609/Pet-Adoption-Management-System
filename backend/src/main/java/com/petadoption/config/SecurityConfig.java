package com.petadoption.config;

import com.petadoption.security.JwtAuthFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // ===== 1. CORS =====
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // ===== 2. DISABLE CSRF =====
                .csrf(csrf -> csrf.disable())

                // ===== 3. AUTH RULES =====
                .authorizeHttpRequests(auth -> auth

                        // ---- allow OPTIONS ----
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ---- login ----
                        .requestMatchers("/api-auth/login").permitAll()

                        // ---- PUBLIC ----
                        .requestMatchers("/pets/**").permitAll()
                        .requestMatchers("/images/**").permitAll()

                        // ---- USER ADOPTION ----
                        .requestMatchers("/form/save").permitAll()
                        .requestMatchers("/adoptions/**").permitAll()

                        // ---- auth helpers ----
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/otp/**").permitAll()

                        // ---- static ----
                        .requestMatchers(
                                "/img/**",
                                "/css/**",
                                "/js/**",
                                "/static/**",
                                "/favicon.ico")
                        .permitAll()

                        // ---- ADMIN ----
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // 🔥 CRITICAL FOR ADMIN PAGE
                        .requestMatchers("/admin/forms/").permitAll()
                        .requestMatchers("/admin/forms/**").permitAll()

                        // ---- others ----
                        .anyRequest().authenticated())

                // ===== 4. JWT FILTER =====
                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));

        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"));

        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}

// .authorizeHttpRequests(auth -> auth

// // ---- CRITICAL: allow OPTIONS for browser ----
// .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

// // ---- PUBLIC LOGIN ENDPOINT ----
// .requestMatchers("/api-auth/login").permitAll()

// // ---- other public ----
// .requestMatchers("/api/auth/**").permitAll()
// .requestMatchers("/api/otp/**").permitAll()

// // ---- static ----
// .requestMatchers(
// "/img/**",
// "/css/**",
// "/js/**",
// "/static/**",
// "/favicon.ico")
// .permitAll()

// // ---- admin secured ----
// .requestMatchers("/api/admin/**").hasRole("ADMIN")

// // ---- everything else ----
// .anyRequest().authenticated())

// // ===== 4. JWT FILTER =====
// .addFilterBefore(
// jwtAuthFilter,
// UsernamePasswordAuthenticationFilter.class);

// return http.build();
// }

// // ===== PASSWORD ENCODER =====
// @Bean
// public BCryptPasswordEncoder passwordEncoder() {
// return new BCryptPasswordEncoder(10);
// }

// // ===== CORS CONFIG =====
// @Bean
// public CorsConfigurationSource corsConfigurationSource() {

// CorsConfiguration config = new CorsConfiguration();

// config.setAllowedOrigins(List.of("http://localhost:5173"));

// config.setAllowedMethods(List.of(
// "GET", "POST", "PUT", "DELETE", "OPTIONS"));

// config.setAllowedHeaders(List.of("*"));
// config.setAllowCredentials(true);

// UrlBasedCorsConfigurationSource source = new
// UrlBasedCorsConfigurationSource();

// source.registerCorsConfiguration("/**", config);

// return source;
// }
// }
