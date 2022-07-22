package com.ssafy.sharemind.common.exception.handler;

import com.ssafy.sharemind.common.model.Response;
import com.ssafy.sharemind.common.exception.NotFindUuidException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(NotFindUuidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response<?> notFindUuidException(NotFindUuidException e){
        return new Response<>("false",  e.getMessage(),null);
    }




}
