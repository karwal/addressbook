package com.pwc.addressbook;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.util.logging.Logger;
import java.util.logging.Level;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private Logger logger = Logger.getLogger(RestExceptionHandler.class.getName());

    @ExceptionHandler(EntityAlreadyExists.class)
    protected ResponseEntity<ApiError> handleEntityNotFound(EntityAlreadyExists ex) {
        logger.log(Level.WARNING, ex.getMessage());
        return new ResponseEntity<>(new ApiError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
