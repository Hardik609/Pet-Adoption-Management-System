package com.petadoption.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.petadoption.entity.PendingPets;

public interface PendingPetRepository extends JpaRepository<PendingPets, Long> {
}
