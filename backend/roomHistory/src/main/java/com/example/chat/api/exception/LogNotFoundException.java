package com.example.chat.api.exception;

public class LogNotFoundException extends RuntimeException{
    public LogNotFoundException() {
        super();
    }

    public LogNotFoundException(String message) {
        super(message);
    }

    public LogNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public LogNotFoundException(Throwable cause) {
        super(cause);
    }

    protected LogNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
