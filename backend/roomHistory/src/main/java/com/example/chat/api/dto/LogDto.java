package com.example.chat.api.dto;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class LogDto {

    @Id
    private String id;
    private String sessionId;
    private Timestamp createTime;
    private String participant;
    private List<ChatDto> chats = new ArrayList<>();
}
