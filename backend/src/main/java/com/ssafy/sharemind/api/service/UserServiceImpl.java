package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.api.response.ShareRoomHistoryResponseDto;
import com.ssafy.sharemind.api.response.UserMypageResponseDto;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.api.response.TokenResponseDto;
import com.ssafy.sharemind.api.response.UserDetailResponseDto;
import com.ssafy.sharemind.common.exception.TokenNotFoundException;
import com.ssafy.sharemind.common.exception.UserNotFoundException;
import com.ssafy.sharemind.common.util.TokenProvider;
import com.ssafy.sharemind.db.entity.Token;
import com.ssafy.sharemind.db.repository.TokenRepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import com.ssafy.sharemind.api.request.UserRegisterDto;
import com.ssafy.sharemind.api.response.UserRegistResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final TokenProvider tokenProvider;

    public UserRegistResponseDto register(UserRegisterDto userRegisterDto) {

        User user = User.builder().uuid(userRegisterDto.getUuid())
                .name(userRegisterDto.getName())
                .email(userRegisterDto.getEmail())
                .sessionId(userRegisterDto.getSessionId())
                .imagePath(userRegisterDto.getImagePath()).build();
        userRepository.save(user);
        UserRegistResponseDto userRegistResponseDto =new UserRegistResponseDto().builder()
                .email(user.getEmail())
                .name(user.getName())
                .imagePath(user.getImagePath())
                .sessionId(user.getSessionId())
                .uuid(user.getUuid()).build();
        return userRegistResponseDto;
    }


    @Transactional(readOnly = true)
    public UserMypageResponseDto findUser(String accessToken) {
        String uuid = tokenProvider.getUserUuid(accessToken);
        User user =userRepository.findByUuid(uuid).orElseThrow(NotFindUuidException::new);
        List<QnAResponseDto> qnAList=user.getQnAList().stream().map(qnA -> QnAResponseDto.builder()
                .answer(qnA.getAnswer())
                .id(qnA.getId())
                .answer_date(qnA.getAnswerDate())
                .content(qnA.getContent())
                .question_date(qnA.getQuestionDate())
                .title(qnA.getTitle())
                .uuid(qnA.getUser().getUuid())
                .isAnswered(qnA.getIsAnswered())
                .build()).collect(Collectors.toList());
        Collections.sort(qnAList, (o1,o2)->o2.getQuestion_date().compareTo(o1.getQuestion_date()));

        List<QnAResponseDto> qnAResponseList = new ArrayList<>();
        for(int i=0;i<qnAList.size();i++){
            if(i==5){
                break;
            }
            qnAResponseList.add(qnAList.get(i));
        }


        List<ShareRoomHistoryResponseDto> roomList=user.getShareRoomHistoryList().stream().map(shareRoomHistory
        -> ShareRoomHistoryResponseDto.builder().roomName(shareRoomHistory.getRoomName())
                .date(shareRoomHistory.getDate())
                .filePath(shareRoomHistory.getFilePath())
                .hostName(shareRoomHistory.getHostName())
                .id(shareRoomHistory.getId())
                .participants(shareRoomHistory.getParticipants())
                .uuid(shareRoomHistory.getUser().getUuid())
                .build()).collect(Collectors.toList());
        Collections.sort(roomList,(o1,o2)->o2.getDate().compareTo(o1.getDate()));

        List<ShareRoomHistoryResponseDto> roomResponseList=new ArrayList<>();
        for(int i=0;i<roomList.size();i++){
            if(i==5){
                break;
            }
            roomResponseList.add(roomList.get(i));
        }

        UserMypageResponseDto userMypageResponseDto =new UserMypageResponseDto().builder()
                .email(user.getEmail())
                .name(user.getName())
                .imagePath(user.getImagePath())
                .sessionId(user.getSessionId())
                .qnAList(qnAResponseList)
                .shareRoomHistoryList(roomResponseList)
                .uuid(user.getUuid()).build();

        return userMypageResponseDto;
    }


    @Transactional
    public void deleteUser(String accessToken) {
        String uuid = tokenProvider.getUserUuid(accessToken);
        tokenRepository.deleteByUuid(uuid);
        userRepository.findByUuid(uuid).orElseThrow(NotFindUuidException::new);
        userRepository.deleteByUuid(uuid);


    }


    @Transactional(readOnly = true)
    public TokenResponseDto reIssue(String accessToken, String refreshToken) {
        tokenProvider.validateToken(refreshToken);

        String uuid = tokenProvider.getUserUuid(accessToken);

        Token token = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(TokenNotFoundException::new);

        User user = token.getUser();

        if (!uuid.equals(user.getUuid())) {
            throw new UserNotFoundException("사용자를 찾을 수 없습니다.");
        }

        return TokenResponseDto.builder()
                .accessToken(tokenProvider.createAccessToken(user.getUuid(), user.getEmail(), user.getName()))
                .build();
    }

    @Transactional(readOnly = true)
    public UserDetailResponseDto userInfoByToken(String accessToken) {
        String uuid = tokenProvider.getUserUuid(accessToken);

        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        return UserDetailResponseDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .imagePath(user.getImagePath())
                .uuid(user.getUuid())
                .sessionId(user.getSessionId())
                .build();
    }

    public void logout(String accessToken) {
        String uuid = tokenProvider.getUserUuid(accessToken);

        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        tokenRepository.deleteByUser(user);
    }
}
