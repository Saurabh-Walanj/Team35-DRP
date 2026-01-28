package com.cdac.RationSahayata.dto;

public class AddCitizenDto {

    private String citizenEmail;
    private String cardNumber;
    private String headOfFamilyName;
    private Integer familyMemberCount;
    private String address;
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
	public String getHeadOfFamilyName() {
		return headOfFamilyName;
	}
	public void setHeadOfFamilyName(String headOfFamilyName) {
		this.headOfFamilyName = headOfFamilyName;
	}
	public Integer getFamilyMemberCount() {
		return familyMemberCount;
	}
	public void setFamilyMemberCount(Integer familyMemberCount) {
		this.familyMemberCount = familyMemberCount;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

    
}
