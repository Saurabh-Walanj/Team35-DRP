package com.cdac.RationSahayata.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.RationSahayata.Entities.RationShop;

@Repository
public interface RationShopRepository  extends JpaRepository<RationShop, Integer> {
	
	Optional<RationShop> findByShopkeeperId(Integer shopkeeperId);
    boolean existsByShopkeeperId(Integer shopkeeperId);
	
}
