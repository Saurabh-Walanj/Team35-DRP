package com.cdac.RationSahayata.service;

import java.util.List;
import java.util.Map;

public interface CitizenService {
	  Map<String, Object> getMyRationCard(String email);
	    
	  
	    List<Map<String, Object>> getEntitlements();
	    
	 
	    List<Map<String, Object>> getMyDistributions(String email);
}
