package com.example.chat.api.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ChatDto {

    private Timestamp chatTime;
    private String name;
    private String content;
}
