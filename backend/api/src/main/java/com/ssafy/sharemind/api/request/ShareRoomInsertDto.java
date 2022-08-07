package com.ssafy.sharemind.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShareRoomInsertDto {
    private String id;
    private String hostName;
    private String participants;
    private String roomName;
    private String uuid;

}
