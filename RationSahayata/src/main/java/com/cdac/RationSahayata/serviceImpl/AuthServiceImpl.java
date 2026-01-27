	package com.cdac.RationSahayata.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import com.cdac.RationSahayata.Entities.*;
import com.cdac.RationSahayata.Enums.*;
import com.cdac.RationSahayata.config.*;
import com.cdac.RationSahayata.dto.*;
import com.cdac.RationSahayata.exception.*;
import com.cdac.RationSahayata.repository.*;
import com.cdac.RationSahayata.service.*;


import lombok.Builder;



@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserResponseDto register(RegistrationDto registerDto) {
		
		if(userRepository.existsByEmail(registerDto.getEmail())) {
			throw new DuplicateResourceException("User with this Email Already Exist");
		}
		
		UserStatus initialStatus;
		if(registerDto.getRole()==UserRole.CITIZEN) {
			initialStatus = UserStatus.Active;
		}
		else {
			initialStatus = UserStatus.Inactive;
		}
		
		User user = new User();
		user.setName(registerDto.getName());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		user.setRole(registerDto.getRole());
        user.setStatus(initialStatus);
        
        
        User savedUser = userRepository.save(user);
        return UserResponseDto.builder()
                .userId(savedUser.getUserId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().toString())
                .status(savedUser.getStatus().toString())
                .build();
        
	}

	@Override
	public LoginResponceDto login(LoginDto loginDto) {
		
		  User user = userRepository.findByEmail(loginDto.getEmail())
	                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));
		  
		  if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
	            throw new UnauthorizedException("Invalid email or password");
	        }
		  
		  if (user.getStatus() == UserStatus.Suspended) {
	            throw new UnauthorizedException("Your account has been suspended. Contact admin.");
	        }
		  String token = jwtService.generateToken(user);
		  
		  UserResponseDto userResponse = UserResponseDto.builder()
	                .userId(user.getUserId())
	                .name(user.getName())
	                .email(user.getEmail())
	                .role(user.getRole().toString())
	                .status(user.getStatus().toString())
	                .build();
		  
		  return LoginResponceDto.builder().message("Login successful").token(token).user(userResponse).build();
		  
		  

	}

}
