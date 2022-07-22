package com.ssafy.sharemind.api.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegistResponseDto {

    private String uuid;
    private String email;
    private String imagePath;
    private String name;
    private String url;

}
