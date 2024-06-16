package com.makeAMatch.makeAMatch.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {

        // Setting the response status to 401 Unauthorized
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        // Setting the content type to application/json or text/plain depending on your need
        response.setContentType("application/json");
        // Writing a custom JSON response or plain text message
        response.getWriter().write("{\"error\": \"Access Denied: You do not have the necessary permissions to access this resource.\"}");
    }
}