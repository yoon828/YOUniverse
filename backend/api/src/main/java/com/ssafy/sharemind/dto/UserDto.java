package com.ssafy.sharemind.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class UserDto {

    private String uuid;
    private String name;
    private String email;
    private String url;
    private String imagePath;
}
