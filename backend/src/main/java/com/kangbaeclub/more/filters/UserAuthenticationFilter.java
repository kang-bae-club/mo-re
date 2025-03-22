package com.kangbaeclub.more.filters;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

public class UserAuthenticationFilter extends OncePerRequestFilter {
    private static final String TOKEN_PREFIX = "Bearer";
    private static final AuthenticationFailedResponse TOKEN_MISSING =
            new AuthenticationFailedResponse(-401, "check the authorization header");

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 1. 인증이 필요한 API에 토큰이 포함되지 않은 경우
        if (bearerToken == null
                || bearerToken.isEmpty()
                || !bearerToken.split(" ")[0].equals(TOKEN_PREFIX)) {
            handleError(response, TOKEN_MISSING);
            return;
        }
        String token = bearerToken.split(" ")[1];
        String userId = extractUserIdFromToken(token);
        request = sanitizeRequest(request, userId);
        filterChain.doFilter(request, response);
    }

    private HttpServletRequest sanitizeRequest(HttpServletRequest request, String userId)
            throws IOException {
        CustomHttpServletRequestWrapper sanitizedRequest =
                new CustomHttpServletRequestWrapper(request);
        sanitizedRequest.addUserIdInRequestBody(userId);
        return sanitizedRequest;
    }

    private String extractUserIdFromToken(String token) {
        // TODO: implement this method
        return "testUserId";
    }

    private void handleError(HttpServletResponse response, AuthenticationFailedResponse error)
            throws IOException {
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getWriter(), error);
    }

    private static class CustomHttpServletRequestWrapper extends HttpServletRequestWrapper {
        private Map<String, String> properties;
        private final ObjectMapper objectMapper;

        public CustomHttpServletRequestWrapper(HttpServletRequest request) throws IOException {
            super(request);
            objectMapper = new ObjectMapper();
            initializeProperties(request.getInputStream());
        }

        @SuppressWarnings("unchecked")
        private void initializeProperties(ServletInputStream inputStream) {

            try {
                properties = objectMapper.readValue(inputStream, Map.class);
            } catch (IOException e) {
                throw new AuthenticationFailedResponse(
                        400, "failed to read and parse request body");
            }
        }

        private void addUserIdInRequestBody(String userId) {
            properties.put("userId", userId);
        }

        @Override
        public ServletInputStream getInputStream() throws IOException {
            String jsonValue = objectMapper.writeValueAsString(properties);
            InputStream inputStream = new ByteArrayInputStream(jsonValue.getBytes());

            return new ServletInputStream() {
                @Override
                public boolean isFinished() {
                    try {
                        return inputStream.available() == 0;
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }

                @Override
                public boolean isReady() {
                    return true;
                }

                @Override
                public void setReadListener(ReadListener listener) {
                    throw new UnsupportedOperationException();
                }

                @Override
                public int read() throws IOException {
                    return inputStream.read();
                }
            };
        }
    }

    // TODO: 추후 Exception 관련한 패키지를 생성하고 이 클래스를 옮길 것
    public static class AuthenticationFailedResponse extends RuntimeException {
        private int code;
        private String message;

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public AuthenticationFailedResponse() {}

        public AuthenticationFailedResponse(int code, String messege) {
            this.code = code;
            this.message = messege;
        }
    }
}
