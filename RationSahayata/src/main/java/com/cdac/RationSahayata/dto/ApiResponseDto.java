package com.cdac.RationSahayata.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponseDto {
    private String message;
    private Object data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static ApiResponseDtoBuilder builder() {
        return new ApiResponseDtoBuilder();
    }

    public static class ApiResponseDtoBuilder {
        private String message;
        private Object data;

        public ApiResponseDtoBuilder message(String message) {
            this.message = message;
            return this;
        }

        public ApiResponseDtoBuilder data(Object data) {
            this.data = data;
            return this;
        }

        public ApiResponseDto build() {
            ApiResponseDto dto = new ApiResponseDto();
            dto.setMessage(message);
            dto.setData(data);
            return dto;
        }
    }
}
