package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.QnA;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.QnARepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import com.ssafy.sharemind.api.request.QnARegisterDto;
import com.ssafy.sharemind.api.response.QnAResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QnAServiceImpl implements QnAService{

    private final QnARepository qnARepository;

    private final UserRepository userRepository;


    public QnAResponseDto writeQnA(QnARegisterDto qnARegisterDto){
        User user=userRepository.findByUuid(qnARegisterDto.getUuid()).orElseThrow(NotFindUuidException::new);


        QnA qna= QnA.builder().
                title(qnARegisterDto.getTitle()).
                content(qnARegisterDto.getContent()).
                isAnswered(qnARegisterDto.getIsAnswered()).
                user(user).build();
        QnA qnaResponse=qnARepository.save(qna);
        QnAResponseDto qnAResponseDto = new QnAResponseDto().builder()
                .id(qnaResponse.getId())
                .answer(qnaResponse.getAnswer())
                .answer_date(qnaResponse.getAnswerDate())
                .content(qnaResponse.getContent())
                .isAnswered(qnaResponse.getIsAnswered())
                .question_date(qnaResponse.getQuestionDate())
                .title(qnaResponse.getTitle())
                .uuid(user.getUuid()).build();

        return qnAResponseDto;
    }

}
