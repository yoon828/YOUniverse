package com.example.chat.api.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class HistoryDto {

    private String logId;
    private String hostName;
    private String participants;
    private String roomName;
    private Timestamp createTime;
}
