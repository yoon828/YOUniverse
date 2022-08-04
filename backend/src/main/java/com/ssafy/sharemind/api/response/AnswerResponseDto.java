package com.ssafy.sharemind.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerResponseDto {
    long id;
    private String answer;
    private Timestamp answer_date;
}
