package com.cdac.RationSahayata.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LoginResponceDto {
	 private String message;
	 private String token;
	 private UserResponseDto user;
	
}
