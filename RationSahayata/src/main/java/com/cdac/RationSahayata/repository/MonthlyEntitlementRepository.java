package com.cdac.RationSahayata.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.RationSahayata.Entities.MonthlyEntitlement;
import com.cdac.RationSahayata.Enums.GrainType;

public interface MonthlyEntitlementRepository extends JpaRepository<MonthlyEntitlement, Integer> {
	Optional<MonthlyEntitlement> findByGrain(GrainType grain);
    boolean existsByGrain(GrainType grain);
}
