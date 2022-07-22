package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.response.ShareRoomHistoryResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface ShareRoomService {

    ShareRoomHistoryResponseDto insertShareRoomHistory(ShareRoomInsertDto shareRoomInsertDto);
}
