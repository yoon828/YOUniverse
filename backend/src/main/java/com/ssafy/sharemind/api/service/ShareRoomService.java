package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.response.ShareRoomHistoryResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShareRoomService {

    ShareRoomHistoryResponseDto insertShareRoomHistory(ShareRoomInsertDto shareRoomInsertDto);

    List<ShareRoomHistoryResponseDto> getShareRoomHistory(String uuid);
}
