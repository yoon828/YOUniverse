package com.example.chat.api.exception;

public class HistoryException extends RuntimeException{
    public HistoryException() {
        super();
    }

    public HistoryException(String message) {
        super(message);
    }

    public HistoryException(String message, Throwable cause) {
        super(message, cause);
    }

    public HistoryException(Throwable cause) {
        super(cause);
    }

    protected HistoryException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
