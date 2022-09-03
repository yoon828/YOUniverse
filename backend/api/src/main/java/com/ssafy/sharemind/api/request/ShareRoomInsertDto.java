package com.ssafy.sharemind.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShareRoomInsertDto {
    private String hostName;
    private String participants;
    private String roomName;
    private String logId;
    private Timestamp createTime;
}
