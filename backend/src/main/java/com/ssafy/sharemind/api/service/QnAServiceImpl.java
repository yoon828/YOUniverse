package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.common.exception.NotFindQuestionException;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.QnA;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.QnARepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import com.ssafy.sharemind.api.request.QnARegisterDto;
import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.common.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QnAServiceImpl implements QnAService{

    private final QnARepository qnARepository;

    private final UserRepository userRepository;

    private final TokenProvider tokenProvider;


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

    public List<QnAResponseDto> getQnAList(String accessToken){
        String uuid = tokenProvider.getUserUuid(accessToken);
        User user =userRepository.findByUuid(uuid).orElseThrow(NotFindUuidException::new);

        List<QnAResponseDto> list= user.getQnAList().stream().map(qnA -> QnAResponseDto.builder()
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

    @Transactional
    public boolean deleteQnA(long id){
        qnARepository.findById(id).orElseThrow(NotFindQuestionException::new);
        qnARepository.deleteById(id);
        return true;
    }
}
