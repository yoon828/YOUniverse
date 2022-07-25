package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.response.UserDetailResponseDto;
import com.ssafy.sharemind.api.response.UserMypageResponseDto;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.api.request.UserRegisterDto;
import com.ssafy.sharemind.api.response.UserRegistResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    UserRegistResponseDto register(UserRegisterDto userRegisterDto);

    UserMypageResponseDto findUser(String accessToken);


    void deleteUser(String accessToken);

    UserDetailResponseDto userInfoByToken(String accessToken);
}
