package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.response.ShareRoomHistoryResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShareRoomService {

    ShareRoomHistoryResponseDto insertShareRoomHistory(String accessToken, ShareRoomInsertDto shareRoomInsertDto);

    List<ShareRoomHistoryResponseDto> getShareRoomHistoryByUuid(String accessToken);

    ShareRoomHistoryResponseDto getShareRoomHistoryById(String accessToken, long id);
}
