package com.petadoption.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petadoption.entity.PendingPets;
import com.petadoption.entity.Pets;
import com.petadoption.repository.PendingPetRepository;
import com.petadoption.repository.PetRepository;

import jakarta.transaction.Transactional;

@Service
public class PetApprovalService {

    @Autowired
    private PendingPetRepository pendingRepo;

    @Autowired
    private PetRepository petRepo;

    @Transactional
    public void approvePet(Long pendingPetId, Long adminId) {

        PendingPets pending = pendingRepo.findById(pendingPetId)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        Pets pet = new Pets();
        pet.setName(pending.getName());
        pet.setCategory(pending.getCategory());
        pet.setBreed(pending.getBreed());
        pet.setAge(pending.getAge());
        pet.setGender(pending.getGender());
        pet.setImagePath(pending.getImagePath());
        pet.setStatus("available");

        petRepo.save(pet);          // insert into pets
        pendingRepo.delete(pending); // remove from pending
    }
}
