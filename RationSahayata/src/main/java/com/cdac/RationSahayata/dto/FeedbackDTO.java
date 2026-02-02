package com.cdac.RationSahayata.dto;

import lombok.Data;

@Data
public class FeedbackDTO {
    private Integer shopkeeperId;
    private String citizenEmail;
    private Integer rating;
    private String comments;
}
