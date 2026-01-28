package com.cdac.RationSahayata.service;

import com.cdac.RationSahayata.dto.*;
import com.cdac.RationSahayata.Entities.*;

import java.util.List;
import java.util.Map;

public interface ShopkeeperService {

    Map<String, Object> getMyShop(Integer shopkeeperId);

    Map<String, Object> addCitizen(Integer shopkeeperId, AddCitizenDto dto);

    List<RationCard> getCitizens(Integer shopkeeperId);

    List<StockAllocation> getStockAllocations(Integer shopkeeperId);

    List<RationShopStock> viewCurrentStock(Integer shopId);

    List<RationDistributionLog> distributionHistory(Integer shopkeeperId);

    Map<String, Object> distributeRation(DistributeRationDto dto);
}
