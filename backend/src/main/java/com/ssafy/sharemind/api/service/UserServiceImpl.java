package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.api.response.UserMypageResponseDto;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.UserRepository;
import com.ssafy.sharemind.api.request.UserRegisterDto;
import com.ssafy.sharemind.api.response.UserRegistResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
        UserMypageResponseDto userMypageResponseDto =new UserMypageResponseDto().builder()
                .email(user.getEmail())
                .name(user.getName())
                .imagePath(user.getImagePath())
                .url(user.getUrl())
                .qnAList(user.getQnAList().stream().limit(5).map(qnA -> QnAResponseDto.builder()
                        .answer(qnA.getAnswer())
                        .id(qnA.getId())
                        .answer_date(qnA.getAnswerDate())
                        .content(qnA.getContent())
                        .question_date(qnA.getQuestionDate())
                        .title(qnA.getTitle())
                        .uuid(qnA.getUser().getUuid())
                        .isAnswered(qnA.getIsAnswered())
                        .build()).collect(Collectors.toList()))
//                .shareRoomHistoryList(user.getShareRoomHistoryList())
                .uuid(user.getUuid()).build();

        return userMypageResponseDto;
    }

    public void deleteUser(String uuid) {

        if (userRepository.findByUuid(uuid) == null) {
            throw new NotFindUuidException(uuid + " 회원이 존재하지 않습니다.");
        }

        userRepository.deleteByUuid(uuid);


    }


}
