package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.common.model.Response;
import com.ssafy.sharemind.api.service.QnAService;
import com.ssafy.sharemind.api.request.QnARegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/qna")
public class QnAController {

    private final QnAService qnAService;

    @PostMapping
    public ResponseEntity<?> writeQnA(@RequestBody QnARegisterDto qnARegisterDto){

        return new ResponseEntity<>(new Response<>("true", "글 등록 성공",
                qnAService.writeQnA(qnARegisterDto)), HttpStatus.CREATED);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<?> getQnAList(@PathVariable String uuid){
        return new ResponseEntity<>(new Response<>("true","회원 QnA 조회 성공",
                qnAService.getQnAList(uuid)),HttpStatus.OK);
    }
    //    @ResponseStatus(HttpStatus.OK)
//    @DeleteMapping("/{uuid}")
//    public Response<?> deleteUser(@PathVariable String uuid) {
//
//        userService.deleteUser(uuid);
//        return new Response<>("true", uuid + " 회원을 탈퇴시켰습니다.", true);
//
//
//    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQnA(@PathVariable long id){
        return new ResponseEntity<>(new Response<>("true","문의 삭제 성공",
                qnAService.deleteQnA(id)),HttpStatus.OK);
    }
}
