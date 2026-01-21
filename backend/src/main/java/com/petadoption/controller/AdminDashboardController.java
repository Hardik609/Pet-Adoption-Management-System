package com.petadoption.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.ResponseEntity;

import java.util.*;

@RestController
@RequestMapping("/api/admin/stats")
@CrossOrigin
public class AdminDashboardController {

    @Autowired
    private JdbcTemplate jdbc;

    // 1️⃣ Total users
    @GetMapping("/users")
    public Map<String, Object> getTotalUsers() {
        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM users", Integer.class);
        return Map.of("count", count);
    }

    // 2️⃣ Total pets
    @GetMapping("/pets")
    public Map<String, Object> getTotalPets() {
        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM pets", Integer.class);
        return Map.of("count", count);
    }

    // 3️⃣ Total adoption requests
    @GetMapping("/requests")
    public Map<String, Object> getTotalRequests() {
        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM adoption_request", Integer.class);
        return Map.of("count", count);
    }

    // 4️⃣ Total adopted pets
    @GetMapping("/adopted")
    public Map<String, Object> getAdoptedPets() {
        Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM pets WHERE status = 'adopted'", Integer.class);
        return Map.of("count", count);
    }

    // 5️⃣ Pet type distribution
    @GetMapping("/pet-types")
    public List<Map<String, Object>> getPetTypes() {
        return jdbc.query(
                "SELECT breed AS type, COUNT(*) AS count FROM pets GROUP BY breed",
                (rs, rowNum) -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("_id", rs.getString("type"));
                    map.put("count", rs.getInt("count"));
                    return map;
                });
    }

    // 6️⃣ Monthly adoption stats
    @GetMapping("/monthly")
    public List<Map<String, Object>> getMonthlyStats() {
        return jdbc.query(
                """
                        SELECT
                          DATE_FORMAT(request_date, '%b') AS month,
                          COUNT(*) AS requests,
                          SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS adoptions
                        FROM adoption_requests
                        GROUP BY month
                        ORDER BY MIN(request_date)
                        """,
                (rs, rowNum) -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("month", rs.getString("month"));
                    map.put("requests", rs.getInt("requests"));
                    map.put("adoptions", rs.getInt("adoptions"));
                    return map;
                });
    }
}
