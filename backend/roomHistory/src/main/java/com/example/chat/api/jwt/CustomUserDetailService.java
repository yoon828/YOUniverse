package com.example.chat.api.jwt;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@RequiredArgsConstructor
@Service("userDetailService")
@Slf4j
public class CustomUserDetailService implements UserDetailsService {

    // username이 DB에 있는지 확인
    @Override
    public UserDetails loadUserByUsername(String uuid) throws UsernameNotFoundException {

        return CustomUserDetails.builder()
                .id(uuid)
                .build();
    }
}