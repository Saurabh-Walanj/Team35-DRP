package com.cdac.RationSahayata.Entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.cdac.RationSahayata.Enums.*;


import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter 
@RequiredArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User {
	
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer userId;

	    @NotNull(message = "Name is required")
	    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
	    @Column(nullable = false, length = 50)
	    private String name;

	    @NotNull(message = "Email is required")
	    @Email(message = "Invalid email format")
	    @Size(max = 100)
	    @Column(nullable = false, unique = true, length = 100)
	    private String email;

	    @NotNull(message = "Role is required")
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private UserRole role;

	    @NotNull(message = "Status is required")
	    @Enumerated(EnumType.STRING)
	    @Column(nullable = false)
	    private UserStatus status;

	    @NotNull(message = "Password is required")
	    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
	    @Column(nullable = false, length = 100)
	    private String password;

	    @CreationTimestamp
	    @Column(name = "created_at", nullable = false, updatable = false)
	    private LocalDateTime createdAt;
	
}
