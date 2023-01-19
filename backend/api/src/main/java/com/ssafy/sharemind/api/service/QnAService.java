package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.api.request.QnARegisterDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QnAService {

    QnAResponseDto writeQnA(QnARegisterDto userRegisterDto);

    List<QnAResponseDto> getQnAList(String accessToken);

    boolean deleteQnA(long id);

    QnAResponseDto getQnAById(String accessToken, long id);

}