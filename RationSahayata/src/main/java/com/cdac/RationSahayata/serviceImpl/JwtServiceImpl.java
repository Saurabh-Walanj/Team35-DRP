package com.cdac.RationSahayata.serviceImpl;

import java.util.*;

import java.util.HashMap;
import java.security.Key;


import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cdac.RationSahayata.Entities.*;
import com.cdac.RationSahayata.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service

public class JwtServiceImpl implements JwtService {

	@Value("${jwt.secret}")
	private String SECRET_KEY;

	@Value("${jwt.expiration}")
	private Long EXPIRATION_TIME;

	private Key getSigningKey() {
		return (Key) Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}

	@Override
	public String generateToken(User user) {

		HashMap<String, Object> claims = new HashMap<>();
		claims.put("userId", user.getUserId());
		claims.put("role", user.getRole().toString());
		claims.put("status", user.getStatus().toString());

		return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith((java.security.Key) getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
	}

	@Override
	public String extractEmail(String token) {
		return extractAllClaims(token).getSubject();
	}

	@Override
	public Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
	}

	@Override
	public boolean validateToken(String token, String email) {
	    final String extractedEmail = extractEmail(token);
	    return (extractedEmail.equals(email) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {
	    return extractAllClaims(token).getExpiration().before(new Date());
	}

}
