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
public class ShareRoomHistoryResponseDto {

    private long id;
    private Timestamp date;
    private String logId;
    private String hostName;
    private String participants;
    private String roomName;
    private String uuid;
}
