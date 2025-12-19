package com.petadoption.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.petadoption.entity.PendingPets;
import com.petadoption.repository.PendingPetRepository;
import com.petadoption.service.PetApprovalService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private PendingPetRepository pendingPetRepository;

    @Autowired
    private PetApprovalService petApprovalService;

    // View all pending pets
    @GetMapping("/pets/pending")
    public List<PendingPets> getPendingPets() {
        return pendingPetRepository.findAll();
    }

    // Approve pet
    @PostMapping("/pets/{id}/approve")
    public ResponseEntity<String> approvePet(
            @PathVariable Long id,
            @RequestParam Long adminId) {

        petApprovalService.approvePet(id, adminId);
        return ResponseEntity.ok("Pet approved successfully");
    }

    // Reject pet
    @PostMapping("/pets/{id}/reject")
    public ResponseEntity<String> rejectPet(@PathVariable Long id) {
        pendingPetRepository.deleteById(id);
        return ResponseEntity.ok("Pet rejected successfully");
    }
}
