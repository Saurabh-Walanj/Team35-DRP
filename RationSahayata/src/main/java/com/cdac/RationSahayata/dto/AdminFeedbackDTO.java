package com.cdac.RationSahayata.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AdminFeedbackDTO {
    private Integer feedbackId;
    private String shopName;
    private String rationCardNumber;
    private String citizenEmail;
    private Integer rating;
    private String comments;
    private LocalDateTime createdAt;
}
