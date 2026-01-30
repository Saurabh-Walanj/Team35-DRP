package com.cdac.RationSahayata.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.RationSahayata.Entities.RationCard;
import com.cdac.RationSahayata.Entities.RationShop;
import com.cdac.RationSahayata.Entities.User;

public interface RationCardRepository extends JpaRepository<RationCard, String> {
	Optional<RationCard> findByCitizenEmail(String citizenEmail);
	boolean existsByCitizen(User citizen);
    boolean existsByCitizenEmail(String citizenEmail);
	List<RationCard> findByShop(RationShop  shop);
}
