package com.example.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class productException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
public productException(String message) {
		
		super(message);
	}

}
