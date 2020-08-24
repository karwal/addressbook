package com.pwc.addressbook.security;

import java.io.IOException;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class AuthenticationInterceptor extends HandlerInterceptorAdapter {
    private Logger logger = Logger.getLogger(AuthenticationInterceptor.class.getName());
    private static String AUTH_HEADER_NAME = "Authorization";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String authToken = request.getHeader(AUTH_HEADER_NAME);
        if (authToken == null) {
            logger.log(Level.INFO, "Missing authorization token");
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }

        if (!isValidToken(authToken)) {
            logger.log(Level.INFO, "Invalid authorization token");
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return false;
        }

        logger.log(Level.INFO, "----Authorization Successful----");

        return true;
    }

    private boolean isValidToken(String authToken) {
        if (authToken.equals("abc123")) {
            return true;
        }
        return false;
    }

}