package com.ssafy.sharemind.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(length = 50)
    private String uuid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String sessionId;

    private String imagePath;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ShareRoomHistory> shareRoomHistoryList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<QnA> qnAList = new ArrayList<>();
}
