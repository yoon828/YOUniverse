package com.ssafy.sharemind.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegisterDto {
    private String uuid;
    private String name;
    private String email;
    private String url;
    private String imagePath;
}
