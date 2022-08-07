package com.example.chat.api.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class LogDtoRequest {

    private String hostName;
    private String participants;
    private String roomName;
    private String sessionId;
    private Timestamp createTime;
    private List<ChatDto> chats = new ArrayList<>();
}
