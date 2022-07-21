package com.ssafy.sharemind.api.service;

import com.ssafy.sharemind.api.response.Response;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.UserRepository;
import com.ssafy.sharemind.dto.UserRegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public User register(UserRegisterDto userRegisterDto) {
        User user = User.builder().uuid(userRegisterDto.getUuid())
                .name(userRegisterDto.getName())
                .email(userRegisterDto.getEmail())
                .url(userRegisterDto.getUrl())
                .imagePath(userRegisterDto.getImagePath()).build();
        return userRepository.save(user);
    }

    public User findUser(String uuid) {
        return userRepository.findByUuid(uuid);
    }

    public void deleteUser(String uuid) {

        if (userRepository.findByUuid(uuid) == null) {
            throw new NotFindUuidException(uuid + " 회원이 존재하지 않습니다.");
        }

        userRepository.deleteByUuid(uuid);


    }


}
