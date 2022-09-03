package com.ssafy.sharemind.api.response;

import lombok.*;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnAResponseDto {
    private Long id;
    private String answer;
    private Timestamp answer_date;
    private String title;
    private String content;
    private Timestamp question_date;
    private Boolean isAnswered = false;
    private String uuid;
}
