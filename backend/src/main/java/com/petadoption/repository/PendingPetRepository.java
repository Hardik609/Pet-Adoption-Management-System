package com.petadoption.repository;

import com.petadoption.entity.PendingPets;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingPetRepository
        extends JpaRepository<PendingPets, Long> {
}
