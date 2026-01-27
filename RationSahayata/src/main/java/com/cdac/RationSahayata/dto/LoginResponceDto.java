package com.cdac.RationSahayata.dto;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdac.RationSahayata.dto.*;
import com.cdac.RationSahayata.repository.*;
import com.cdac.RationSahayata.service.*;
import com.cdac.RationSahayata.serviceImpl.*;

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
