package com.petadoption.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getServletPath();

        System.out.println("🔥 FILTER CHECK PATH = " + path);

        // ✅ SKIP JWT FOR PUBLIC PATHS
        return path.startsWith("/api-auth")
                || path.startsWith("/api/auth")
                || path.startsWith("/api/otp")

                // 🔥 ADDED AS YOU REQUESTED
                || path.startsWith("/admin/forms")

                || path.startsWith("/pets")
                || path.startsWith("/images")
                || path.startsWith("/adoptions")
                || path.equals("/api-auth/login");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("🔥 FILTER EXECUTING FOR = "
                + request.getServletPath());

        String authHeader = request.getHeader("Authorization");
        String token = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        if (token != null && jwtUtil.validateToken(token)) {

            String email = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    List.of(authority));

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}

// package com.petadoption.security;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// import org.springframework.beans.factory.annotation.Autowired;
// import
// org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;
// import java.util.List;

// @Component
// public class JwtAuthFilter extends OncePerRequestFilter {

// @Autowired
// private JwtUtil jwtUtil;

// @Override
// protected boolean shouldNotFilter(HttpServletRequest request) {

// String path = request.getServletPath();

// System.out.println("🔥 FILTER CHECK PATH = " + path);

// // ✅ SKIP JWT FOR PUBLIC PATHS
// return path.startsWith("/api-auth")
// || path.startsWith("/api/auth")
// || path.startsWith("/api/otp")
// || path.startsWith("/pets")
// || path.startsWith("/images")
// || path.startsWith("/adoptions") // ✅ ADDED
// || path.equals("/api-auth/login");
// }

// @Override
// protected void doFilterInternal(
// HttpServletRequest request,
// HttpServletResponse response,
// FilterChain filterChain)
// throws ServletException, IOException {

// System.out.println("🔥 FILTER EXECUTING FOR = "
// + request.getServletPath());

// String authHeader = request.getHeader("Authorization");
// String token = null;

// if (authHeader != null && authHeader.startsWith("Bearer ")) {
// token = authHeader.substring(7);
// }

// if (token != null && jwtUtil.validateToken(token)) {

// String email = jwtUtil.extractUsername(token);
// String role = jwtUtil.extractRole(token);

// SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" +
// role);

// UsernamePasswordAuthenticationToken authentication = new
// UsernamePasswordAuthenticationToken(
// email,
// null,
// List.of(authority));

// SecurityContextHolder.getContext()
// .setAuthentication(authentication);
// }

// filterChain.doFilter(request, response);
// }
// }
