package com.example.chat.api.document;


import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Chat {

    private Timestamp chatTime;
    private String name;
    private String content;
}
