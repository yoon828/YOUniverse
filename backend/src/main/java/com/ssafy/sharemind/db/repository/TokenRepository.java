package com.ssafy.sharemind.db.repository;

import com.ssafy.sharemind.db.entity.Token;
import com.ssafy.sharemind.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByUser(User user);

    Optional<Token> findByRefreshToken(String refreshToken);

    void deleteByUser(User user);

    @Modifying
    @Query("delete from Token t where t.user.uuid = :uuid")
    void deleteByUuid(@Param("uuid") String uuid);
}
