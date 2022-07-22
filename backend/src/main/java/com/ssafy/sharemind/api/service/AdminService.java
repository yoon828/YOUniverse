package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.response.AnswerResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {

    AnswerResponseDto writeAnswer(AnswerRegisterDto answerRegisterDto);
}
