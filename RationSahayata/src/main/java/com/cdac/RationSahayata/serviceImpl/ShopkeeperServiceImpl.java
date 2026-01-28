package com.cdac.RationSahayata.serviceImpl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cdac.RationSahayata.Entities.RationCard;
import com.cdac.RationSahayata.Entities.RationDistributionLog;
import com.cdac.RationSahayata.Entities.RationShop;
import com.cdac.RationSahayata.Entities.RationShopStock;
import com.cdac.RationSahayata.Entities.StockAllocation;
import com.cdac.RationSahayata.Entities.User;
import com.cdac.RationSahayata.Enums.RationCardStatus;
import com.cdac.RationSahayata.Enums.UserRole;
import com.cdac.RationSahayata.dto.AddCitizenDto;
import com.cdac.RationSahayata.dto.DistributeRationDto;
import com.cdac.RationSahayata.exception.BadRequestException;
import com.cdac.RationSahayata.repository.MonthlyEntitlementRepository;
import com.cdac.RationSahayata.repository.RationCardRepository;
import com.cdac.RationSahayata.repository.RationDistributionLogRepository;
import com.cdac.RationSahayata.repository.RationShopRepository;
import com.cdac.RationSahayata.repository.RationShopStockRepository;
import com.cdac.RationSahayata.repository.StockAllocationRepository;
import com.cdac.RationSahayata.repository.UserRepository;
import com.cdac.RationSahayata.service.ShopkeeperService;

@Service
public class ShopkeeperServiceImpl implements ShopkeeperService {

	private final UserRepository userRepo;
	private final RationShopRepository shopRepo;
	private final RationCardRepository cardRepo;
	private final MonthlyEntitlementRepository entitlementRepo;
	private final StockAllocationRepository stockAllocationRepo;
	private final RationShopStockRepository shopStockRepo;
	private final RationDistributionLogRepository distributionLogRepo;

	public ShopkeeperServiceImpl(UserRepository userRepo, RationShopRepository shopRepo, RationCardRepository cardRepo,
			MonthlyEntitlementRepository entitlementRepo, StockAllocationRepository stockAllocationRepo,
			RationShopStockRepository shopStockRepo, RationDistributionLogRepository distributionLogRepo) {
		this.userRepo = userRepo;
		this.shopRepo = shopRepo;
		this.cardRepo = cardRepo;
		this.entitlementRepo = entitlementRepo;
		this.stockAllocationRepo = stockAllocationRepo;
		this.shopStockRepo = shopStockRepo;
		this.distributionLogRepo = distributionLogRepo;
	}

	// get shopkkeper SHOP
	@Override
	public Map<String, Object> getMyShop(Integer shopkeeperId) {

		RationShop shop = shopRepo.findByShopkeeperId(shopkeeperId)
				.orElseThrow(() -> new BadRequestException("Shop not found"));

		Map<String, Object> map = new HashMap<>();
		map.put("shopId", shop.getShopId());
		map.put("shopName", shop.getShopName());
		map.put("location", shop.getLocation());
		map.put("status", shop.getStatus());
		map.put("createdAt", shop.getCreatedAt());

		return map;
	}

	// add citizen
	@Override
	public Map<String, Object> addCitizen(Integer shopkeeperId, AddCitizenDto dto) {

		RationShop shop = shopRepo.findByShopkeeperId(shopkeeperId)
				.orElseThrow(() -> new BadRequestException("Shop not found"));

		User citizen = userRepo.findByEmail(dto.getCitizenEmail()).filter(u -> u.getRole() == UserRole.CITIZEN)
				.orElseThrow(() -> new BadRequestException("Citizen not found"));

		if (cardRepo.findByCitizenEmail(dto.getCitizenEmail()).isPresent()) {
			throw new RuntimeException("Citizen already has ration card");
		}

		RationCard card = new RationCard(dto.getCardNumber(), citizen, dto.getHeadOfFamilyName(),
				dto.getFamilyMemberCount(), dto.getAddress(), shop, RationCardStatus.VERIFIED, LocalDateTime.now());

		cardRepo.save(card);

		return Map.of("message", "Citizen added successfully");
	}

	// get citizens under that shopkeeper
	@Override
	public List<RationCard> getCitizens(Integer shopkeeperId) {

		RationShop shop = shopRepo.findByShopkeeperId(shopkeeperId)
				.orElseThrow(() -> new BadRequestException("Shop not found"));

		return null;
	}

	// stock allocation getting
	@Override
	public List<StockAllocation> getStockAllocations(Integer shopkeeperId) {

		RationShop shop = shopRepo.findByShopkeeperId(shopkeeperId)
				.orElseThrow(() -> new BadRequestException("Shop not found"));

		return null;
	}
	
	// view current stock
	@Override
	public List<RationShopStock> viewCurrentStock(Integer shopId) {
		return null;
	}


	// distribution history
	@Override
	public List<RationDistributionLog> distributionHistory(Integer shopkeeperId) {
		RationShop shop = shopRepo.findByShopkeeperId(shopkeeperId)
				.orElseThrow(() -> new BadRequestException("Shop not found"));

		return null;
	}

	@Override
	public Map<String, Object> distributeRation(DistributeRationDto dto) {
		// TODO Auto-generated method stub
		return null;
	}


}
