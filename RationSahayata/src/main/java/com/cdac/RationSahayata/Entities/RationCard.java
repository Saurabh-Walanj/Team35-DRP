package com.cdac.RationSahayata.Entities;

import java.time.LocalDateTime;
import java.time.LocalDate;

import com.cdac.RationSahayata.Enums.GrainType;
import com.cdac.RationSahayata.Enums.RationCardStatus;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ration_card")
public class RationCard {
    @Id
    @Column(nullable = false, length = 12)
    private String cardNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citizen_email", referencedColumnName = "email", unique = true, nullable = false)
    private User citizen;

    @Column(nullable = false, length = 100)
    private String headOfFamilyName;

    @Column(nullable = false)
    private Integer familyMemberCount;

    @Column(nullable = false, length = 500)
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id", nullable = false)
    private RationShop shop;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RationCardStatus status;

    @Column(nullable = false)
    private LocalDate issueDate = LocalDate.now();

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public User getCitizen() {
        return citizen;
    }

    public void setCitizen(User citizen) {
        this.citizen = citizen;
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

    public RationShop getShop() {
        return shop;
    }

    public void setShop(RationShop shop) {
        this.shop = shop;
    }

    public RationCardStatus getStatus() {
        return status;
    }

    public void setStatus(RationCardStatus status) {
        this.status = status;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }
}
