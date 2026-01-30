package com.cdac.RationSahayata.Entities;

import java.time.LocalDateTime;

import com.cdac.RationSahayata.Enums.ShopStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ration_shops")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RationShop {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer shopId;

	@Column(nullable = false, length = 150)
	private String shopName;

	@Column(nullable = false, length = 500)
	private String location;

	@NotNull
	@Column(nullable = false)
	private Integer shopkeeperId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "shopkeeperId", insertable = false, updatable = false)
	private User shopkeeper;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ShopStatus status;

	@Column(nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	public Integer getShopId() {
		return shopId;
	}

	public void setShopId(Integer shopId) {
		this.shopId = shopId;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getShopkeeperId() {
		return shopkeeperId;
	}

	public void setShopkeeperId(Integer shopkeeperId) {
		this.shopkeeperId = shopkeeperId;
	}

	public User getShopkeeper() {
		return shopkeeper;
	}

	public void setShopkeeper(User shopkeeper) {
		this.shopkeeper = shopkeeper;
	}

	public ShopStatus getStatus() {
		return status;
	}

	public void setStatus(ShopStatus status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}
