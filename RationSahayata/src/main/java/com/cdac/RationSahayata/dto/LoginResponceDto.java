package com.cdac.RationSahayata.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LoginResponceDto {
	private String message;
	private String token;
	private UserResponseDto user;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserResponseDto getUser() {
		return user;
	}

	public void setUser(UserResponseDto user) {
		this.user = user;
	}

	public static LoginResponceDtoBuilder builder() {
		return new LoginResponceDtoBuilder();
	}

	public static class LoginResponceDtoBuilder {
		private String message;
		private String token;
		private UserResponseDto user;

		public LoginResponceDtoBuilder message(String message) {
			this.message = message;
			return this;
		}

		public LoginResponceDtoBuilder token(String token) {
			this.token = token;
			return this;
		}

		public LoginResponceDtoBuilder user(UserResponseDto user) {
			this.user = user;
			return this;
		}

		public LoginResponceDto build() {
			LoginResponceDto dto = new LoginResponceDto();
			dto.setMessage(message);
			dto.setToken(token);
			dto.setUser(user);
			return dto;
		}
	}
}
