package com.cdac.RationSahayata.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCitizenDto {

    @NotBlank(message = "Head of family name is required")
    @Size(max = 100)
    private String headOfFamilyName;

    @NotNull(message = "Family member count is required")
    @Min(value = 1, message = "Family must have at least 1 member")
    @Max(value = 20, message = "Family cannot exceed 20 members")
    private Integer familyMemberCount;

    @NotBlank(message = "Address is required")
    @Size(max = 500)
    private String address;
}