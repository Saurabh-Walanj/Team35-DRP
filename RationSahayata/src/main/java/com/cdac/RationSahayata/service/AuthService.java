package com.cdac.RationSahayata.service;

import com.cdac.RationSahayata.dto.*;



public interface AuthService {
	 UserResponseDto register(RegistrationDto registerDto);
	    LoginResponceDto login(LoginDto loginDto);

}
