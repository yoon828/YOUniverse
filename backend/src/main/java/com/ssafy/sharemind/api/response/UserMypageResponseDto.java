package com.ssafy.sharemind.api.response;

import com.ssafy.sharemind.db.entity.QnA;
import com.ssafy.sharemind.db.entity.ShareRoomHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMypageResponseDto {
    private String uuid;
    private String email;
    private String imagePath;
    private String name;
    private String url;
    private List<ShareRoomHistoryResponseDto> shareRoomHistoryList = new ArrayList<>();
    private List<QnAResponseDto> qnAList = new ArrayList<>();
}
