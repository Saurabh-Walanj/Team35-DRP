package com.cdac.RationSahayata.service;

import java.math.BigDecimal;

public interface EmailService {
	void sendOtpEmail(String toEmail, String otp);
	void sendDistributionSuccessEmail(
            String toEmail, 
            String citizenName, 
            String headOfFamily,
            String cardNumber,
            String grainType, 
            Double quantity, 
            String month, 
            String shopName, 
            String shopLocation
    );
}
