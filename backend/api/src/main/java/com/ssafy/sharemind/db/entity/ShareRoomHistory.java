package com.ssafy.sharemind.db.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ShareRoomHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomName;

    private String logId;

    @Column(nullable = false)
    private String hostName;

    @Column(nullable = false)
    private Timestamp date;

    @Column(nullable = false)
    private String participants;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uuid")
    private User user;


}
