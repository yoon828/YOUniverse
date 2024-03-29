package com.example.chat.api.exception;

public class TokenNotFoundException extends IllegalArgumentException{
    public TokenNotFoundException() {
        super();
    }

    public TokenNotFoundException(String s) {
        super(s);
    }

    public TokenNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TokenNotFoundException(Throwable cause) {
        super(cause);
    }
}