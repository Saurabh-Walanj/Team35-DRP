package com.cdac.RationSahayata.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShopApprovalDto {
	@NotBlank(message = "Shop name is required")
    @Size(max = 150)
    private String shopName;

    @NotBlank(message = "Location is required")
    @Size(max = 500)
    private String location;
}
