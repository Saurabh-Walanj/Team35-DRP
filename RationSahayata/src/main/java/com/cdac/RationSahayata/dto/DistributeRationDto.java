package com.cdac.RationSahayata.dto;

import com.cdac.RationSahayata.Enums.GrainType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class DistributeRationDto {

    @NotBlank(message = "Card number is required")
    @Size(min = 12, max = 12)
    private String cardNumber;

    @NotNull(message = "Grain type is required")
    private GrainType grain;

    private String otp;

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public GrainType getGrain() {
        return grain;
    }

    public void setGrain(GrainType grain) {
        this.grain = grain;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}
