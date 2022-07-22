package com.ssafy.sharemind.db.repository;

import com.ssafy.sharemind.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUuid(String uuid);

    void deleteByUuid(String uuid);

    List<User> findByEmail(String email);
}
