package com.example.chat.api.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Document
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class LogDoc {

    @Id
    private String id;
    private String sessionId;
    private LocalDateTime createTime;
    private String participants;
    private List<Chat> chats = new ArrayList<>();

}
