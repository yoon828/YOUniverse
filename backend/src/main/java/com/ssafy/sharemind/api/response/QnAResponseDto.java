package com.ssafy.sharemind.api.response;

import lombok.*;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnAResponseDto {
    private Long id;
    private String answer;
    private Date answer_date;
    private String title;
    private String content;
    private Date question_date;
    private Boolean isAnswered = false;
    private String uuid;
}
