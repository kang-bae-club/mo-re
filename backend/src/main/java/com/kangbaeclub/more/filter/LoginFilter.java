package com.kangbaeclub.more.filter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kangbaeclub.more.member.dto.LoginRequestDto;
import com.kangbaeclub.more.member.dto.LoginResponseDto;
import com.kangbaeclub.more.member.entity.Refresh;
import com.kangbaeclub.more.member.repository.RefreshRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public LoginFilter(
            AuthenticationManager authenticationManager,
            JWTUtil jwtUtil,
            RefreshRepository refreshRepository) {
        super.setFilterProcessesUrl("/v1/users/login"); // 로그인 url 매핑 설정
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request, HttpServletResponse response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            LoginRequestDto loginRequestDto =
                    objectMapper.readValue(request.getInputStream(), LoginRequestDto.class);
            String username = loginRequestDto.getUsername();
            String password = loginRequestDto.getPassword();
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(username, password, null);
            return authenticationManager.authenticate(authToken);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // 인증에 성공한 경우
    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication)
            throws IOException {
        String username = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        // 토큰 생성
        String access = jwtUtil.createJwt("access", username, role, 3600000L);
        String refresh = jwtUtil.createJwt("refresh", username, role, 8640000L);

        // refresh 토큰 저장
        addRefreshEntity(username, refresh, 8640000L);

        // 응답 설정
        response.setContentType("application/json");
        // 1. body - access token 저장
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setToken(access);
        response.getWriter().write(objectMapper.writeValueAsString(loginResponseDto));
        // 2. cookie - refresh token 저장
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    private void addRefreshEntity(String username, String refresh, long expireTime) {
        Date date = new Date(System.currentTimeMillis() + expireTime);
        Refresh refreshEntity = new Refresh();
        refreshEntity.createRefresh(username, refresh, date.toString());
        refreshRepository.save(refreshEntity);
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
        return cookie;
    }

    // 인증에 실패한 경우
    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException failed) {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
    }
}
