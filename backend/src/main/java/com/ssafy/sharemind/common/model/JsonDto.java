package com.ssafy.sharemind.common.model;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JsonDto {
    private boolean success;
    private String msg;
}