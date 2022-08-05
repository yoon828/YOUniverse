package com.example.chat.api.document;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Chat {

    private LocalDateTime chatTime;
    private String name;
    private String content;
}
