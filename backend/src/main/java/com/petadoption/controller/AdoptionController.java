package com.petadoption.controller;

import com.petadoption.entity.Pet;
import com.petadoption.repository.PetRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adoptions")
public class AdoptionController {

    private final PetRepository repo;

    public AdoptionController(PetRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> adopt(@PathVariable Long id) {
        Pet p = repo.findById(id).orElseThrow();
        p.setStatus("adopted");
        repo.save(p);
        return ResponseEntity.ok("Adopted successfully");
    }
}
