package com.cdac.RationSahayata.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class UserResponseDto {
	
    private Integer userId;
    private String name;
    private String email;
    private String role;
    private String status;
}
