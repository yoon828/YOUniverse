package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.response.ShareRoomHistoryResponseDto;
import com.ssafy.sharemind.common.exception.NotFindShareRoomException;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.ShareRoomHistory;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.ShareRoomHistoryRepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import com.ssafy.sharemind.common.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ShareRoomServiceImpl implements ShareRoomService {

    private final UserRepository userRepository;

    private final ShareRoomHistoryRepository shareRoomHistoryRepository;

    private final TokenProvider tokenProvider;


    public ShareRoomHistoryResponseDto insertShareRoomHistory(ShareRoomInsertDto shareRoomInsertDto) {
        User user = userRepository.findByUuid(shareRoomInsertDto.getUuid()).orElseThrow(NotFindUuidException::new);

        ShareRoomHistory shareRoomHistory = ShareRoomHistory.builder()
                .roomName(shareRoomInsertDto.getRoomName())
                .filePath(shareRoomInsertDto.getFilePath())
                .hostName(shareRoomInsertDto.getHostName())
                .participants(shareRoomInsertDto.getParticipants())
                .user(user)
                .date(new Timestamp(System.currentTimeMillis())).build();

        ShareRoomHistory shareRoomHistoryResponse = shareRoomHistoryRepository.save(shareRoomHistory);
        ShareRoomHistoryResponseDto shareRoomHistoryResponseDto = ShareRoomHistoryResponseDto.builder()
                .uuid(user.getUuid())
                .roomName(shareRoomInsertDto.getRoomName())
                .participants(shareRoomInsertDto.getParticipants())
                .hostName(shareRoomInsertDto.getHostName())
                .filePath(shareRoomHistoryResponse.getFilePath())
                .date(shareRoomHistory.getDate())
                .id(shareRoomHistory.getId()).build();
        return shareRoomHistoryResponseDto;

    }

    public List<ShareRoomHistoryResponseDto> getShareRoomHistoryByUuid(String accessToken) {
        String uuid = tokenProvider.getUserUuid(accessToken);
        User user = userRepository.findByUuid(uuid).orElseThrow(NotFindUuidException::new);

        List<ShareRoomHistoryResponseDto> roomList = user.getShareRoomHistoryList().stream()
                .map(shareRoomHistory -> ShareRoomHistoryResponseDto.builder().roomName(shareRoomHistory.getRoomName())
                        .date(shareRoomHistory.getDate())
                        .filePath(shareRoomHistory.getFilePath())
                        .hostName(shareRoomHistory.getHostName())
                        .id(shareRoomHistory.getId())
                        .participants(shareRoomHistory.getParticipants())
                        .uuid(shareRoomHistory.getUser().getUuid())
                        .build()).sorted((o1, o2) -> o2.getDate().compareTo(o1.getDate()))
                .collect(Collectors.toList());

        return roomList;
    }

    public ShareRoomHistoryResponseDto getShareRoomHistoryById(String accessToken, long id) {

        ShareRoomHistory shareRoomHistory = shareRoomHistoryRepository.findById(id)
                .orElseThrow(NotFindShareRoomException::new);

        ShareRoomHistoryResponseDto shareRoomHistoryResponseDto = ShareRoomHistoryResponseDto.builder()
                .uuid(tokenProvider.getUserUuid(accessToken))
                .roomName(shareRoomHistory.getRoomName())
                .participants(shareRoomHistory.getParticipants())
                .hostName(shareRoomHistory.getHostName())
                .filePath(shareRoomHistory.getFilePath())
                .date(shareRoomHistory.getDate())
                .id(shareRoomHistory.getId()).build();

        return shareRoomHistoryResponseDto;
    }

}
