package com.ssafy.sharemind.common.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataResult<T> extends Result{
    private T data;
}