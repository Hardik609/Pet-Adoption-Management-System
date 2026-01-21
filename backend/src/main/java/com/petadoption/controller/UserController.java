package com.petadoption.controller;

import com.petadoption.entity.Pet;
import com.petadoption.entity.PendingPets;

import com.petadoption.repository.PetRepository;
import com.petadoption.repository.PendingPetRepository;

import com.petadoption.service.FileStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pets")
@CrossOrigin
public class UserController {

    @Autowired
    private FileStorageService fileStorageService;

    private final PetRepository petRepository;
    private final PendingPetRepository pendingPetRepository;

    public UserController(
            PetRepository petRepository,
            PendingPetRepository pendingPetRepository) {

        this.petRepository = petRepository;
        this.pendingPetRepository = pendingPetRepository;
    }

    // SHOW APPROVED PETS
    @GetMapping
    public List<Pet> getAllApprovedPets() {
        return petRepository.findAll();
    }

    // SUBMIT PET WITH IMAGE
    @PostMapping(value = "/submit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> submitPet(

            @RequestParam String name,
            @RequestParam String breed,
            @RequestParam int age,
            @RequestParam String gender,
            @RequestParam String location,
            @RequestParam String description,
            @RequestParam MultipartFile file

    ) throws IOException {

        PendingPets pet = new PendingPets();

        pet.setName(name);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setGender(gender);
        pet.setLocation(location);
        pet.setDescription(description);

        String path = fileStorageService.savePendingPetImage(file);

        pet.setImagePath(path);

        pendingPetRepository.save(pet);

        return ResponseEntity.ok(
                "Pet submitted for approval");
    }
}
