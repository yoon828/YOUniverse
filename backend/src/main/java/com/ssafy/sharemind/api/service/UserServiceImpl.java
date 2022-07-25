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
                .url(userRegisterDto.getUrl())
                .imagePath(userRegisterDto.getImagePath()).build();
        userRepository.save(user);
        UserRegistResponseDto userRegistResponseDto =new UserRegistResponseDto().builder()
                .email(user.getEmail())
                .name(user.getName())
                .imagePath(user.getImagePath())
                .url(user.getUrl())
                .uuid(user.getUuid()).build();
        return userRegistResponseDto;
    }


    @Transactional(readOnly = true)
    public UserMypageResponseDto findUser(String uuid) {
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
                .url(user.getUrl())
                .qnAList(qnAResponseList)
                .shareRoomHistoryList(roomResponseList)
                .uuid(user.getUuid()).build();

        return userMypageResponseDto;
    }

    public void deleteUser(String uuid) {

        userRepository.findByUuid(uuid).orElseThrow(NotFindUuidException::new);
        userRepository.deleteByUuid(uuid);


    }


    @Transactional(readOnly = true)
    public TokenResponseDto reIssue(String refreshToken){

        Token token = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(TokenNotFoundException::new);

        User user = token.getUser();

        return TokenResponseDto.builder()
                .accessToken(tokenProvider.createAccessToken(user.getEmail(), user.getName()))
                .build();
    }

    @Transactional(readOnly = true)
    public UserDetailResponseDto userInfoByToken(String accessToken) {
        String email = tokenProvider.getMemberEmail(accessToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        return UserDetailResponseDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .imagePath(user.getImagePath())
                .uuid(user.getUuid())
                .url(user.getUrl())
                .build();
    }

    public void logout(String accessToken) {
        String email = tokenProvider.getMemberEmail(accessToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        tokenRepository.deleteByUser(user);
    }
}
