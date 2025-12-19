package com.petadoption.repository;
import com.petadoption.entity.Pets;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pets, Long> {
}