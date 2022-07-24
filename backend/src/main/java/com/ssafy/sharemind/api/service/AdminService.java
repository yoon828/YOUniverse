package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.response.AnswerResponseDto;
import com.ssafy.sharemind.api.response.QnAResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

    AnswerResponseDto writeAnswer(AnswerRegisterDto answerRegisterDto);
    List<QnAResponseDto> getQnAList();
}
