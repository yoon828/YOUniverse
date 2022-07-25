package com.ssafy.sharemind.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserDetailResponseDto {
    private String uuid;
    private String name;
    private String email;
    private String url;
    private String imagePath;
}
