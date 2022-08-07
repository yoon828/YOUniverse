package com.example.chat.api.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class HistoryDto {

    private String logId;
    private String hostName;
    private String participants;
    private String roomName;
}
