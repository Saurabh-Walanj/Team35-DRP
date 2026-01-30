package com.cdac.RationSahayata.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cdac.RationSahayata.service.CitizenService;

@RestController
@RequestMapping("/api/citizen")
@CrossOrigin(origins = "*")
public class CitizenController {

	@Autowired
	private CitizenService citizenService;

	@GetMapping("/my-ration-card/{email}")
	public ResponseEntity<Map<String, Object>> getMyRationCard(@PathVariable String email) {
		Map<String, Object> rationcard = citizenService.getMyRationCard(email);
		return ResponseEntity.ok(rationcard);
	}

	@GetMapping("/my-distributions/{email}")
	public ResponseEntity<List<Map<String, Object>>> getMyDistributions(@PathVariable String email) {
		List<Map<String, Object>> myDistributionsLogs = citizenService.getMyDistributions(email);
		return ResponseEntity.ok(myDistributionsLogs);
	}

}
