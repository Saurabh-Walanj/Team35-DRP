package com.cdac.RationSahayata.dto;

import com.cdac.RationSahayata.Enums.GrainType;

public class DistributeRationDto {

    private String cardNumber;
    private GrainType grain;
    
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

}
