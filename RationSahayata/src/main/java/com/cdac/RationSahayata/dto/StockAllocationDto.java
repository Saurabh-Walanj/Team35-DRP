package com.cdac.RationSahayata.dto;

import java.math.BigDecimal;

import com.cdac.RationSahayata.Enums.GrainType;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockAllocationDto {
    @NotNull(message = "Shop ID is required")
    private Integer shopId;

    @NotBlank(message = "Month-Year is required")
    private String monthYear;

    @NotNull(message = "Grain type is required")
    private GrainType grain;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "100.0", message = "Quantity must be at least 1")
    @DecimalMax(value = "100000.0", message = "Quantity cannot exceed 100000")
    private Double quantityAllocated;

    @NotBlank(message = "Admin email is required")
    @Email
    private String adminEmail;

    @NotBlank(message = "Admin password is required")
    private String adminPassword;

    public Double getQuantityAllocated() {
        return quantityAllocated;
    }

    public void setQuantityAllocated(Double quantityAllocated) {
        this.quantityAllocated = quantityAllocated;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public String getMonthYear() {
        return monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public GrainType getGrain() {
        return grain;
    }

    public void setGrain(GrainType grain) {
        this.grain = grain;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }
}
