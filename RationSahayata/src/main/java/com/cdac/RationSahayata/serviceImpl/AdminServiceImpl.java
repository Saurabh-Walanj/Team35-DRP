package com.cdac.RationSahayata.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import com.cdac.RationSahayata.Entities.RationShop;
import com.cdac.RationSahayata.Entities.User;
import com.cdac.RationSahayata.Enums.ShopStatus;
import com.cdac.RationSahayata.Enums.UserRole;
import com.cdac.RationSahayata.Enums.UserStatus;
import com.cdac.RationSahayata.dto.MonthlyEntitlementDto;
import com.cdac.RationSahayata.dto.ShopApprovalDto;
import com.cdac.RationSahayata.dto.StockAllocationDto;
import com.cdac.RationSahayata.exception.BadRequestException;
import com.cdac.RationSahayata.repository.*;
import com.cdac.RationSahayata.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired 
	private RationShopRepository rationShopRepository;
	
	//Pending shopkeeper 
	@Override
	public List<Map<String, Object>> getPendingShopkeepers() {
		List<User> allShopkeepers = userRepository.findAll();
		List<Map<String, Object>> result = new ArrayList<>();
		
		for(User u:allShopkeepers) {
			if(u.getRole()==UserRole.SHOPKEEPER && u.getStatus()==UserStatus.Inactive) {
				
				 Map<String, Object> map = new HashMap<>();
		            map.put("userId", u.getUserId());
		            map.put("name", u.getName());
		            map.put("email", u.getEmail());
		            map.put("status", u.getStatus().toString());
		            map.put("createdAt", u.getCreatedAt());
		            
		            result.add(map);
				
			}
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> getAllActiveShopkeepers() {
		
		List<User> allShopkeepers = userRepository.findAll();
		List<Map<String, Object>> result = new ArrayList<>();
		
		for(User u:allShopkeepers) {
			if(u.getRole()==UserRole.SHOPKEEPER && u.getStatus()==UserStatus.Active) {
				
				 Map<String, Object> map = new HashMap<>();
		            map.put("userId", u.getUserId());
		            map.put("name", u.getName());
		            map.put("email", u.getEmail());
		            map.put("status", u.getStatus().toString());
		            map.put("createdAt", u.getCreatedAt());
		            
		            result.add(map);
				
			}
		}
		return result;
	}
	
	// approve shopkeeper 
	@Override
	public Map<String, Object> approveShopkeeper(Integer shopkeeperId) {
		User shopkeeper = userRepository.findById(shopkeeperId)
                .orElseThrow(() -> new BadRequestException("Shopkeeper not found"));

        if (shopkeeper.getRole() != UserRole.SHOPKEEPER) {
            throw new BadRequestException("User is not a shopkeeper");
        }

        shopkeeper.setStatus(UserStatus.Active);
        userRepository.save(shopkeeper);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Shopkeeper approved successfully");
        return response;
	}

	
	@Override
	public Map<String, Object> suspendShopkeeper(Integer shopkeeperId) {
		User shopkeeper = userRepository.findById(shopkeeperId).
				orElseThrow(()-> new BadRequestException("Shopkeeper not found"));
		if (shopkeeper.getRole() != UserRole.SHOPKEEPER) {
            throw new BadRequestException("User is not a shopkeeper");
        }
		RationShop shop = rationShopRepository.findByShopkeeperId(shopkeeperId)
                .orElseThrow(() -> new BadRequestException("Shop not found for this shopkeeper"));

        String actionMessage;

        if (shop.getStatus() == ShopStatus.SUSPENDED && shopkeeper.getStatus() == UserStatus.Suspended) {
            shopkeeper.setStatus(UserStatus.Active);
            shop.setStatus(ShopStatus.ACTIVE);
            actionMessage = "Shopkeeper activated successfully";
        } else {
            shopkeeper.setStatus(UserStatus.Suspended);
            shop.setStatus(ShopStatus.SUSPENDED);
            actionMessage = "Shopkeeper suspended successfully";
        }

        userRepository.save(shopkeeper);
        rationShopRepository.save(shop);

        Map<String, Object> response = new HashMap<>();
        response.put("message", actionMessage);
        return response;
	}

	@Override
	public Map<String, Object> createShopForShopkeeper(Integer shopkeeperId, ShopApprovalDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllShops() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> allocateStock(StockAllocationDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllAllocations() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> createEntitlement(MonthlyEntitlementDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllEntitlements() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> updateEntitlement(MonthlyEntitlementDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllFamilies() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> getAllDistributionLogs() {
		// TODO Auto-generated method stub
		return null;
	}

	

}
