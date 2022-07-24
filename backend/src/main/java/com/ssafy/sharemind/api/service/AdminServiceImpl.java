package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.response.AnswerResponseDto;
import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.api.response.UserMypageResponseDto;
import com.ssafy.sharemind.api.response.UserRegistResponseDto;
import com.ssafy.sharemind.common.exception.NotFindQuestionException;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.QnA;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.QnARepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final QnARepository qnARepository;
    private final UserRepository userRepository;
    public AnswerResponseDto writeAnswer(AnswerRegisterDto answerRegisterDto){
        QnA fQnA=qnARepository.findById(answerRegisterDto.getId()).orElseThrow(NotFindQuestionException::new);
        User user=userRepository.findByUuid(answerRegisterDto.getUuid()).orElseThrow(NotFindUuidException::new);
        QnA qnA= QnA.builder().title(fQnA.getTitle())
                .id(fQnA.getId())
                .answerDate(new Date())
                .answer(answerRegisterDto.getAnswer())
                .content(fQnA.getContent())
                .isAnswered(true)
                .questionDate(fQnA.getQuestionDate())
                .title(fQnA.getTitle())
                .user(user).build();
        QnA qnAResponse=qnARepository.save(qnA);

        AnswerResponseDto answerResponseDto =new AnswerResponseDto().builder()
                .id(qnAResponse.getId())
                .answer(qnAResponse.getAnswer())
                .answer_date(qnAResponse.getAnswerDate()).build();


        return answerResponseDto;
    }


    public List<QnAResponseDto> getQnAList(){

        List<QnAResponseDto> list= qnARepository.findAll().stream().map(qnA -> QnAResponseDto.builder()
                .answer(qnA.getAnswer())
                .id(qnA.getId())
                .answer_date(qnA.getAnswerDate())
                .content(qnA.getContent())
                .question_date(qnA.getQuestionDate())
                .title(qnA.getTitle())
                .uuid(qnA.getUser().getUuid())
                .isAnswered(qnA.getIsAnswered())
                .build()).collect(Collectors.toList());
        Collections.sort(list, (o1, o2)->o2.getQuestion_date().compareTo(o1.getQuestion_date()));

        return list;
    }

    public List<UserRegistResponseDto> getUserList(){
        List<UserRegistResponseDto> list=userRepository.findAll().stream().map(user -> UserRegistResponseDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .imagePath(user.getImagePath())
                .url(user.getUrl())
                .uuid(user.getUuid())
                .build()).collect(Collectors.toList());
        return list;
    }


}
