package com.example.chat.api.exception;

public class LogDuplicationException extends RuntimeException{
    public LogDuplicationException() {
        super();
    }

    public LogDuplicationException(String message) {
        super(message);
    }

    public LogDuplicationException(String message, Throwable cause) {
        super(message, cause);
    }

    public LogDuplicationException(Throwable cause) {
        super(cause);
    }

    protected LogDuplicationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
