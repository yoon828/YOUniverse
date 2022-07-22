package com.ssafy.sharemind.db.repository;

import com.ssafy.sharemind.db.entity.Token;
import com.ssafy.sharemind.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByUser(User user);

    Optional<Token> findByRefreshToken(String refreshToken);

}
