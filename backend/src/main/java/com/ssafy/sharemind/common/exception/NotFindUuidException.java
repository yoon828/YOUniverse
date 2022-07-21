package com.ssafy.sharemind.common.exception;

public class NotFindUuidException extends RuntimeException{
    public NotFindUuidException() {
        super();
    }

    public NotFindUuidException(String message) {
        super(message);
    }

    public NotFindUuidException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFindUuidException(Throwable cause) {
        super(cause);
    }

    protected NotFindUuidException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
