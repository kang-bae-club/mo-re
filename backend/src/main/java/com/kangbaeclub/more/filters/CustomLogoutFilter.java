package com.kangbaeclub.more.filters;

import com.kangbaeclub.more.member.repository.RefreshRepository;
import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilter {
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    public CustomLogoutFilter(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        doFilter((HttpServletRequest)servletRequest, (HttpServletResponse)servletResponse, filterChain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String requestURI = request.getRequestURI();

        // logout api 요청이 아닐 경우, 패스
        if(!requestURI.contains("users/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        // POST 요청이 아닐 경우, 패스
        String method = request.getMethod();
        if(!method.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 쿠키에서 refresh token 가져오기
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies) {
            if(cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if(refresh == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // refresh token 만료 여부 확인
        try {
            jwtUtil.isTokenExpired(refresh);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // token 종류 확인
        String category = jwtUtil.getCategory(refresh);
        if(!category.equals("refresh")) {
           response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
           return;
        }

        // refresh token 삭제
        refreshRepository.deleteByRefresh(refresh);

        // cookie 값 null로 채움
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
