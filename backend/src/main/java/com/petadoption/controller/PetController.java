package com.petadoption.controller;

import com.petadoption.entity.Pet;
import com.petadoption.repository.PetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pets")
public class PetController {

    private final PetRepository repo;

    public PetController(PetRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Pet> getPets() {
        return repo.findAll();
    }
    
    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        return repo.save(pet);
    }
}
