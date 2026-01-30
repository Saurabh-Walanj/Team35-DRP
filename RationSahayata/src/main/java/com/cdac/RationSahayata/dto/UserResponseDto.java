package com.cdac.RationSahayata.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserResponseDto {

    private Integer userId;
    private String name;
    private String email;
    private String role;
    private String status;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static UserResponseDtoBuilder builder() {
        return new UserResponseDtoBuilder();
    }

    public static class UserResponseDtoBuilder {
        private Integer userId;
        private String name;
        private String email;
        private String role;
        private String status;

        public UserResponseDtoBuilder userId(Integer userId) {
            this.userId = userId;
            return this;
        }

        public UserResponseDtoBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserResponseDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserResponseDtoBuilder role(String role) {
            this.role = role;
            return this;
        }

        public UserResponseDtoBuilder status(String status) {
            this.status = status;
            return this;
        }

        public UserResponseDto build() {
            UserResponseDto dto = new UserResponseDto();
            dto.setUserId(userId);
            dto.setName(name);
            dto.setEmail(email);
            dto.setRole(role);
            dto.setStatus(status);
            return dto;
        }
    }
}
