package com.cdac.RationSahayata.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.RationSahayata.Entities.Otp;

public interface OtpRepository extends JpaRepository<Otp, Integer>{
	Optional<Otp> findTopByCardNumberAndOtpAndIsUsedFalseAndExpiryTimeAfterOrderByCreatedAtDesc(
            String cardNumber, String otp, LocalDateTime currentTime);
}
