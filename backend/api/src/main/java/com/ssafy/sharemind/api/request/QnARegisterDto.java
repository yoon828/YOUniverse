package com.ssafy.sharemind.api.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnARegisterDto {

    private String title;
    private String content;
    private Boolean isAnswered = false;
    private String uuid;
}
