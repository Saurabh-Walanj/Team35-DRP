package com.cdac.RationSahayata.Entities;

import java.time.LocalDateTime;

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
	@JoinColumn(name = "citizenEmail", referencedColumnName = "email", unique = true)
	private User citizen;

	@Column(nullable = false, length = 100)
	private String headOfFamilyName;

	@Column(nullable = false)
	private Integer familyMemberCount;

	@Column(nullable = false, length = 500)
	private String address;

	@NotNull
	@Column(nullable = false)
	private Integer shopId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shopId", insertable = false, updatable = false)
	private RationShop shop;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RationCardStatus status;

	@Column(nullable = false)
	private LocalDateTime issueDate = LocalDateTime.now();

}
