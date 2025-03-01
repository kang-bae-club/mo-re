package com.kangbaeclub.more.filter;

import com.kangbaeclub.more.member.entity.Member;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = resolveToken(request.getHeader("Authorization"));

        if(accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwtUtil.isTokenExpired(accessToken);
        } catch (Exception e) {
            PrintWriter writer = response.getWriter();
            writer.println("access token expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String username = jwtUtil.getUsernameFromToken(accessToken);
        String role = jwtUtil.getRoleFromToken(accessToken);
        Member member = new Member();
        member.createMember(username, role);
    }

    private String resolveToken(String header) {
        if(header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
