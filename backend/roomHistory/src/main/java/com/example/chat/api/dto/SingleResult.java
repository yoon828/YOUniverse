package com.example.chat.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SingleResult<T> extends Result {
    private T data;
}
