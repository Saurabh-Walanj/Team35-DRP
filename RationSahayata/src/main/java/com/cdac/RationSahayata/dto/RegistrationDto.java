package com.cdac.RationSahayata.dto;

import com.cdac.RationSahayata.Enums.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor

public class RegistrationDto {

	@NotBlank(message = "Name Cannt Be Blank")
	@Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;
	
	@NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;
	
	
	

}
