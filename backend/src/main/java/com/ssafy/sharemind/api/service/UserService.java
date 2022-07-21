package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.dto.UserRegisterDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


    User register(UserRegisterDto userRegisterDto);

    User findUser(String uuid);


    void deleteUser(String uuid);
}
