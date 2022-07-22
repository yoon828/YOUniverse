package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.response.QnAListForUser;
import com.ssafy.sharemind.api.response.QnAResponseDto;
import com.ssafy.sharemind.db.entity.QnA;
import com.ssafy.sharemind.api.request.QnARegisterDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QnAService {

    QnAResponseDto writeQnA(QnARegisterDto userRegisterDto);
    List<QnAResponseDto> getQnAList(String uuid);

    boolean deleteQnA(long id);

}
