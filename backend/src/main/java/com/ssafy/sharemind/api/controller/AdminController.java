package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.request.AnswerDeleteDto;
import com.ssafy.sharemind.api.request.AnswerRegisterDto;
import com.ssafy.sharemind.api.service.AdminService;
import com.ssafy.sharemind.api.service.UserService;
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
    private final UserService userService;

    @PostMapping("/answer")
    public ResponseEntity<?> writeAnswer(@RequestBody AnswerRegisterDto answerRegisterDto){

        return new ResponseEntity<>(new Response<>(true,"답변 등록 성공",
                adminService.writeAnswer(answerRegisterDto)), HttpStatus.CREATED);
    }

    @PutMapping("/answer")
    public ResponseEntity<?> updateAnswer(@RequestBody AnswerRegisterDto answerRegisterDto){

        return new ResponseEntity<>(new Response<>(true,"답변 수정 성공",
                adminService.writeAnswer(answerRegisterDto)), HttpStatus.CREATED);

    }

    @GetMapping("/qna")
    public ResponseEntity<?> getQnAList(){
       return new ResponseEntity<>(new Response<>(true,"문의 전체 조회 성공",
               adminService.getQnAList()),HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserList(){
        return new ResponseEntity<>(new Response<>(true,"유저 리스트 조회 성공",
                adminService.getUserList()),HttpStatus.OK);
    }

    @DeleteMapping("/user")
    public Response<?> deleteUser(@RequestHeader("authorization") String authorization){
        userService.deleteUser(authorization.replace("Bearer ", ""));
        return new Response<>(true, " 회원을 탈퇴시켰습니다.", true);
    }

    @DeleteMapping("/answer")
    public Response<?> deleteAnswer(@RequestBody AnswerDeleteDto answerDeleteDto){
        adminService.deleteAnswer(answerDeleteDto);
        return new Response<>(true, answerDeleteDto.getId() + " 답변을 삭제시켰습니다.", true);

    }
}
