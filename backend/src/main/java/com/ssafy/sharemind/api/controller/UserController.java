package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.service.UserService;
import com.ssafy.sharemind.api.request.UserRegisterDto;
import com.ssafy.sharemind.api.response.UserRegistResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.sharemind.common.model.Response;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;


    @PostMapping("/auth")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto userRegisterDto) {

        return new ResponseEntity<>(new Response<>("true", "가입 성공",
                userService.register(userRegisterDto)), HttpStatus.CREATED);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{uuid}")
    public Response<?> myPage(@PathVariable String uuid) {
        return new Response<>("true", "조회 성공", userService.findUser(uuid));

    }


    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{uuid}")
    public Response<?> deleteUser(@PathVariable String uuid) {

        userService.deleteUser(uuid);
        return new Response<>("true", uuid + " 회원을 탈퇴시켰습니다.", true);


    }


}
