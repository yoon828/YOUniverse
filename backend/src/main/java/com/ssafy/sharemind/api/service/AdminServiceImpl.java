package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.response.AnswerResponseDto;
import com.ssafy.sharemind.common.exception.NotFindQuestionException;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.QnA;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.QnARepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

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
}
