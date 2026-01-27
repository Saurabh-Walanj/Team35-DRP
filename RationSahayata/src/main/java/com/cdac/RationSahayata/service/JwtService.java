package com.cdac.RationSahayata.service;

import com.cdac.RationSahayata.Entities.User;

import io.jsonwebtoken.Claims;

public interface JwtService {
	String generateToken(User user);

	String extractEmail(String token);

	Claims extractAllClaims(String token);

	boolean validateToken(String token, String email);
}
