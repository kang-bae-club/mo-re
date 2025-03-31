package com.kangbaeclub.more.config;

import java.util.Collections;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.kangbaeclub.more.filters.JWTFilter;
import com.kangbaeclub.more.filters.JWTUtil;
import com.kangbaeclub.more.filters.LoginFilter;
import com.kangbaeclub.more.member.repository.RefreshRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTUtil jwtUtil;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final RefreshRepository refreshRepository;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(
                        (cors) ->
                                cors.configurationSource(
                                        new CorsConfigurationSource() {
                                            @Override
                                            public CorsConfiguration getCorsConfiguration(
                                                    HttpServletRequest request) {
                                                CorsConfiguration config = new CorsConfiguration();
                                                config.setAllowedOrigins(
                                                        List.of("http://localhost:3000"));
                                                config.setAllowedMethods(
                                                        Collections.singletonList("*"));
                                                config.setAllowCredentials(true);
                                                return config;
                                            }
                                        }))
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        (authorize) ->
                                authorize
                                        .requestMatchers("**/users/login")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated())
                .addFilterAt(
                        new LoginFilter(
                                authenticationManager(authenticationConfiguration),
                                jwtUtil,
                                refreshRepository),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class)
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }
}
