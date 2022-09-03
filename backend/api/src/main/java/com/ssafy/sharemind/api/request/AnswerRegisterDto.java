package com.ssafy.sharemind.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerRegisterDto {

    private long id;
    private String answer;
    private String uuid;
}
