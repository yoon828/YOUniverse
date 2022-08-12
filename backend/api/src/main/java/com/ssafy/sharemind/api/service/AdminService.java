package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.request.AnswerDeleteDto;
import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.response.AnswerResponseDto;
import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.api.response.UserRegistResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

    AnswerResponseDto writeAnswer(AnswerRegisterDto answerRegisterDto);
    List<QnAResponseDto> getQnAList();
    List<UserRegistResponseDto> getUserList();
    void deleteUser(String uuid);
    void deleteAnswer(AnswerDeleteDto answerDeleteDto);
    void addAdmin(String uuid);

    boolean checkAdmin(String uuid);

}
