package com.petadoption.controller;

import com.petadoption.entity.PendingPets;
import com.petadoption.entity.Pets;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.PendingPetRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pets")
public class UserController {

    private final PetRepository petRepository;
    private final PendingPetRepository pendingPetRepository;

    public UserController(PetRepository petRepository,
                         PendingPetRepository pendingPetRepository) {
        this.petRepository = petRepository;
        this.pendingPetRepository = pendingPetRepository;
    }

    // Visible to all users
    @GetMapping
    public List<Pets> getAllApprovedPets() {
        return petRepository.findAll();
    }

    // Submit pet for approval
    @PostMapping("/submit")
    public String submitPet(@RequestBody PendingPets pet) {
        pendingPetRepository.save(pet);
        return "Pet submitted for admin approval";
    }
}
