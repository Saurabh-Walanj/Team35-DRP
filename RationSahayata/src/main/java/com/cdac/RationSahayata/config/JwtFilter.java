package com.cdac.RationSahayata.config;

import java.io.IOException;


import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cdac.RationSahayata.exception.*;
import com.cdac.RationSahayata.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtService jwtService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("JWT FILTER HIT → " + request.getRequestURI());

		final String authHeader = request.getHeader("Authorization");
		final String userEmail;
		final String token;
		
		 if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	            filterChain.doFilter(request, response);
	            return;
	        }
		 
		 token = authHeader.substring(7);
		 
		 try {
			 userEmail = jwtService.extractEmail(token);
			 if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	                
	                if (jwtService.validateToken(token, userEmail)) {
	                    String role = jwtService.extractAllClaims(token).get("role", String.class);
	                    
	                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
	                            userEmail,
	                            null,
	                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
	                    );
	                   authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                    SecurityContextHolder.getContext().setAuthentication(authToken);
		 }
	                  
		
	}
	
}
		 catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write("Token is Invalid Please Try Again");
			return;
		}
		 var auth = SecurityContextHolder.getContext().getAuthentication();

		 if (auth != null) {
		     System.out.println("AUTH USER  : " + auth.getPrincipal());
		     System.out.println("AUTHORITIES: " + auth.getAuthorities());
		 } else {
		     System.out.println("NO AUTH IN CONTEXT");
		 }
		 
		 filterChain.doFilter(request, response);
	}
}

