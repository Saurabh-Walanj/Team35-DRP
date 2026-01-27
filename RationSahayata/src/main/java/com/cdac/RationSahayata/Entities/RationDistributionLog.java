package com.cdac.RationSahayata.Entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.cdac.RationSahayata.Enums.DistributionStatus;
import com.cdac.RationSahayata.Enums.GrainType;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ration_distribution_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RationDistributionLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer distributionId;

	@NotNull
	@Column(nullable = false, length = 12)
	private String cardNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cardNumber", insertable = false, updatable = false)
	private RationCard rationCard;

	@NotNull
	@Column(nullable = false)
	private Integer shopId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shopId", insertable = false, updatable = false)
	private RationShop shop;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private GrainType grain;

	@NotNull
	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal quantityGiven;

	@NotNull
	@Column(nullable = false)
	private String distributionMonth;

	@CreationTimestamp
	@Column(name = "distribution_date", nullable = false, updatable = false)
	private LocalDateTime distributionDate;

	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DistributionStatus status;
}
