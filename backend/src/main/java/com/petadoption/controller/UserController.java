package com.petadoption.controller;

import com.petadoption.entity.PendingPets;
import com.petadoption.entity.Pets;
import com.petadoption.repository.PetRepository;
import com.petadoption.service.FileStorageService;
import com.petadoption.repository.PendingPetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/pets")
public class UserController {

   @Autowired
    private FileStorageService fileStorageService;

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
    @PostMapping(
        value = "/submit",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> submitPet(
        @RequestParam String name,
        @RequestParam String category,
        @RequestParam String breed,
        @RequestParam int age,
        @RequestParam String gender,
        @RequestParam String location,
        @RequestParam String description,
        @RequestParam String email,
        @RequestParam String phone,
        @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        PendingPets pet = new PendingPets();
        pet.setName(name);
        pet.setCategory(category);
        pet.setBreed(breed);
        pet.setAge(age);
        pet.setGender(gender);
        pet.setLocation(location);
        pet.setDescription(description);
        pet.setEmail(email);
        pet.setPhone(phone);

        if (file != null && !file.isEmpty()) {
            String imagePath = fileStorageService.savePendingPetImage(file);
            pet.setImagePath(imagePath);
        }


        pendingPetRepository.save(pet);
        return ResponseEntity.ok("Pet submitted for admin approval");
    }
}
