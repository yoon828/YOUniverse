package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.service.AdminService;
import com.ssafy.sharemind.common.model.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/answer")
    public ResponseEntity<?> writeAnswer(@RequestBody AnswerRegisterDto answerRegisterDto){

        return new ResponseEntity<>(new Response<>("true","답변 등록 성공",
                adminService.writeAnswer(answerRegisterDto)), HttpStatus.CREATED);
    }

    @PutMapping("/answer")
    public ResponseEntity<?> updateAnswer(@RequestBody AnswerRegisterDto answerRegisterDto){

        return new ResponseEntity<>(new Response<>("true","답변 등록 성공",
                adminService.writeAnswer(answerRegisterDto)), HttpStatus.CREATED);

    }

    @GetMapping("/qna")
    public ResponseEntity<?> getQnAList(){
       return new ResponseEntity<>(new Response<>("true","문의 전체 조회 성공",
               adminService.getQnAList()),HttpStatus.OK);
    }
}
