package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.service.AdminService;
import com.ssafy.sharemind.common.model.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/answer")
    public ResponseEntity<?> writeAanswer(@RequestBody AnswerRegisterDto answerRegisterDto){

        return new ResponseEntity<>(new Response<>("true","답변 등록 성공",
                adminService.writeAnswer(answerRegisterDto)), HttpStatus.CREATED);
    }
}
