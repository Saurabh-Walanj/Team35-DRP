package com.cdac.RationSahayata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.RationSahayata.Entities.RationShop;
import com.cdac.RationSahayata.Entities.StockAllocation;

public interface StockAllocationRepository extends JpaRepository<StockAllocation, Integer> {
	List<StockAllocation> findByShop_ShopId(Integer shopId);
	List<StockAllocation> findByShop(RationShop shop);
}
