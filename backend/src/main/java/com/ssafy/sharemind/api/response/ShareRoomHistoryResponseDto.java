package com.ssafy.sharemind.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShareRoomHistoryResponseDto {

    private long id;
    private Date date;
    private String filePath;
    private String hostName;
    private String participants;
    private String roomName;
    private String uuid;
}
