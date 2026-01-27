package com.cdac.RationSahayata.Controllers;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.RationSahayata.dto.*;

import com.cdac.RationSahayata.service.*;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	
	//Login api
	 @PostMapping("/login")
	    public ResponseEntity<com.cdac.RationSahayata.dto.LoginResponceDto> login(@Valid @RequestBody LoginDto loginDto) {
	        com.cdac.RationSahayata.dto.LoginResponceDto response = authService.login(loginDto);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }

	 
	 //reg api 
	 @PostMapping("/register")
	    public ResponseEntity<ApiResponseDto> register(@Valid @RequestBody RegistrationDto registerDto) {
	        UserResponseDto userResponse = authService.register(registerDto);
	        
	        ApiResponseDto response = ApiResponseDto.builder()
	                .message("Registration successful")
	                .data(userResponse)
	                .build();
	        
	        return new ResponseEntity<>(response, HttpStatus.CREATED);
	    }
	 
	 
}
