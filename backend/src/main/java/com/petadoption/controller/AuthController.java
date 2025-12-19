package com.petadoption.controller;

import com.petadoption.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String,String> req) {
        return service.signup(req.get("name"), req.get("email"), req.get("password"));
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String,String> req) {
        return service.login(req.get("email"), req.get("password"));
    }
}
