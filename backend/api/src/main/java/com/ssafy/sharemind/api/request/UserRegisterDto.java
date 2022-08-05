package com.ssafy.sharemind.api.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegisterDto {
    private String uuid;
    private String name;
    private String email;
    private String sessionId;
    private String imagePath;
}
