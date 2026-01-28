package com.cdac.RationSahayata.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.RationSahayata.Entities.RationCard;
import com.cdac.RationSahayata.Entities.RationDistributionLog;
import com.cdac.RationSahayata.Entities.RationShopStock;
import com.cdac.RationSahayata.Entities.StockAllocation;
import com.cdac.RationSahayata.dto.AddCitizenDto;
import com.cdac.RationSahayata.dto.DistributeRationDto;
import com.cdac.RationSahayata.service.ShopkeeperService;

@RestController
@RequestMapping("/api/shopkeeper")
public class ShopkeeperController {

    private final ShopkeeperService service;

    public ShopkeeperController(ShopkeeperService service) {
        this.service = service;
    }
    

    @GetMapping("/{shopkeeperId}/shop")
    public Map<String, Object> getMyShop(@PathVariable Integer shopkeeperId) {
        return service.getMyShop(shopkeeperId);
    }

    @PostMapping("/{shopkeeperId}/add-citizen")
    public Map<String, Object> addCitizen(@PathVariable Integer shopkeeperId,
    		@RequestBody AddCitizenDto dto) {

        return service.addCitizen(shopkeeperId, dto);
    }

    @GetMapping("/{shopkeeperId}/citizens")
    public List<RationCard> getCitizens(@PathVariable Integer shopkeeperId) {
        return service.getCitizens(shopkeeperId);
    }
    
    @GetMapping("/stock-allocation/{shopkeeperId}")
    public List<StockAllocation> getStockAllocations(@PathVariable Integer shopkeeperId){
    	return service.getStockAllocations(shopkeeperId);
    }
    
    
    @GetMapping("/my-stock/{shopId}")
    public List<RationShopStock> viewCurrentStock(@PathVariable Integer shopId){
    	return service.viewCurrentStock(shopId);
    }

    @PostMapping("/distribute-ration")
    public Map<String, Object> distributeRation(@RequestBody DistributeRationDto dto) {
        return service.distributeRation(dto);
    }
    
    @GetMapping("/distribution-history/{shopkeeperId}")
    public List<RationDistributionLog> getDistributionHistory(@PathVariable Integer shopkeeperId){
    	return service.distributionHistory(shopkeeperId);
    }
}
