package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.ShareRoomInsertDto;
import com.ssafy.sharemind.api.response.ShareRoomHistoryResponseDto;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.ShareRoomHistory;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.ShareRoomHistoryRepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class ShareRoomServiceImpl implements ShareRoomService {

    private final UserRepository userRepository;

    private final ShareRoomHistoryRepository shareRoomHistoryRepository;


    public ShareRoomHistoryResponseDto insertShareRoomHistory(ShareRoomInsertDto shareRoomInsertDto){
        User user=userRepository.findByUuid(shareRoomInsertDto.getUuid()).orElseThrow(NotFindUuidException::new);

        ShareRoomHistory shareRoomHistory= ShareRoomHistory.builder()
                .roomName(shareRoomInsertDto.getRoomName())
                .filePath(shareRoomInsertDto.getFilePath())
                .hostName(shareRoomInsertDto.getHostName())
                .participants(shareRoomInsertDto.getParticipants())
                .user(user)
                .date(new Date()).build();

        ShareRoomHistory shareRoomHistoryResponse =shareRoomHistoryRepository.save(shareRoomHistory);
        ShareRoomHistoryResponseDto shareRoomHistoryResponseDto= new ShareRoomHistoryResponseDto().builder()
                .uuid(user.getUuid())
                .roomName(shareRoomInsertDto.getRoomName())
                .participants(shareRoomInsertDto.getParticipants())
                .hostName(shareRoomInsertDto.getHostName())
                .filePath(shareRoomHistoryResponse.getFilePath())
                .date(shareRoomHistory.getDate())
                .id(shareRoomHistory.getId()).build();
        return shareRoomHistoryResponseDto;

    }

}
