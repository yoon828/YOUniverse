package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.common.model.Response;
import com.ssafy.sharemind.api.service.QnAService;
import com.ssafy.sharemind.api.request.QnARegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/qna")
public class QnAController {

    private final QnAService qnAService;

    @PostMapping
    public ResponseEntity<?> writeQnA(@RequestBody QnARegisterDto qnARegisterDto){

        System.out.println(qnARegisterDto);
        return new ResponseEntity<>(new Response<>("true", "글 등록 성공",
                qnAService.writeQnA(qnARegisterDto)), HttpStatus.CREATED);
    }
}
