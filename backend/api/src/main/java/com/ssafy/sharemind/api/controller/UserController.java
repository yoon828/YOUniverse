package com.ssafy.sharemind.api.controller;

import com.ssafy.sharemind.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.ssafy.sharemind.common.model.Response;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/back/user")
public class UserController {

    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public Response<?> myPage(@RequestHeader("authorization") String authorization) {
        return new Response<>(true, "조회 성공", userService.findUser(authorization.replace("Bearer ", "")));

    }


    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping
    public Response<?> deleteUser(@RequestHeader("authorization") String authorization) {

        userService.deleteUser(authorization.replace("Bearer ", ""));
        return new Response<>(true, " 회원을 탈퇴시켰습니다.", true);


    }


}
