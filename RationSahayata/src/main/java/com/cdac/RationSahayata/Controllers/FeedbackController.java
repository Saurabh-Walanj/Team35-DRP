package com.cdac.RationSahayata.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.RationSahayata.Entities.Feedback;
import com.cdac.RationSahayata.repository.FeedbackRepository;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private com.cdac.RationSahayata.repository.RationShopRepository rationShopRepository;

    @Autowired
    private com.cdac.RationSahayata.repository.RationCardRepository rationCardRepository;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addFeedback(
            @RequestBody com.cdac.RationSahayata.dto.FeedbackDTO feedbackDTO) {
        if (feedbackDTO.getShopkeeperId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Shopkeeper ID is required"));
        }

        Feedback feedback = new Feedback();
        feedback.setShopkeeperId(feedbackDTO.getShopkeeperId());
        feedback.setCitizenEmail(feedbackDTO.getCitizenEmail());
        feedback.setRating(feedbackDTO.getRating());
        feedback.setComments(feedbackDTO.getComments());

        feedbackRepository.save(feedback);
        return ResponseEntity.ok(Map.of("message", "Feedback submitted successfully"));
    }

    @GetMapping("/shop/{shopkeeperId}")
    public ResponseEntity<List<Feedback>> getShopFeedback(@PathVariable Integer shopkeeperId) {
        return ResponseEntity.ok(feedbackRepository.findByShopkeeperId(shopkeeperId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<com.cdac.RationSahayata.dto.AdminFeedbackDTO>> getAllFeedback() {
        List<Feedback> feedbacks = feedbackRepository.findAll();

        List<com.cdac.RationSahayata.dto.AdminFeedbackDTO> dtos = feedbacks.stream().map(f -> {
            com.cdac.RationSahayata.dto.AdminFeedbackDTO dto = new com.cdac.RationSahayata.dto.AdminFeedbackDTO();
            dto.setFeedbackId(f.getFeedbackId());
            dto.setCitizenEmail(f.getCitizenEmail());
            dto.setRating(f.getRating());
            dto.setComments(f.getComments());
            dto.setCreatedAt(f.getCreatedAt());

            // Fetch Shop Name
            rationShopRepository.findByShopkeeperId(f.getShopkeeperId())
                    .ifPresent(shop -> dto.setShopName(shop.getShopName()));

            // Fetch Ration Card Number
            rationCardRepository.findByCitizenEmail(f.getCitizenEmail())
                    .ifPresent(card -> dto.setRationCardNumber(String.valueOf(card.getCardNumber())));

            return dto;
        }).collect(java.util.stream.Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}
