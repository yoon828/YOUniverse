package com.example.chat.api.service;

import com.example.chat.api.dto.Result;
import com.example.chat.api.dto.SingleResult;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    public <T> SingleResult<T> getSingleResult(T data, String msg) {
        SingleResult<T> result = new SingleResult<>();
        result.setSuccess(true);
        result.setMessage(msg);
        result.setData(data);

        return result;
    }

    public Result getSuccessResult(String msg) {
        Result result = new Result();
        result.setSuccess(true);
        result.setMessage(msg);

        return result;
    }

    public Result getFailureResult(String msg) {
        Result result = new Result();
        result.setSuccess(false);
        result.setMessage(msg);

        return result;
    }
}
