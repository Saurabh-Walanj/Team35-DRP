package com.cdac.RationSahayata.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor

public class GenerateOtpDto {
	@NotNull(message = "Shopkeeper ID is required")
	private Integer shopkeeperId;

	@NotBlank(message = "Citizen email is required")
	@Email
	private String citizenEmail;

	@NotBlank(message = "Card number is required")
	@Size(min = 12, max = 12)
	private String cardNumber;

	public Integer getShopkeeperId() {
		return shopkeeperId;
	}

	public void setShopkeeperId(Integer shopkeeperId) {
		this.shopkeeperId = shopkeeperId;
	}

	public String getCitizenEmail() {
		return citizenEmail;
	}

	public void setCitizenEmail(String citizenEmail) {
		this.citizenEmail = citizenEmail;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
}
