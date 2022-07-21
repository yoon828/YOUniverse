package com.ssafy.sharemind.db.repository;

import com.ssafy.sharemind.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.beans.Transient;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUuid(String uuid);

    @Transactional
    void deleteByUuid(String uuid);


}
