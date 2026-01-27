package com.cdac.RationSahayata.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.RationSahayata.Entities.RationCard;

public interface RationCardRepository extends JpaRepository<RationCard, String> {
	Optional<RationCard> findByCitizenEmail(String citizenEmail);
    boolean existsByCitizenEmail(String citizenEmail);
}
