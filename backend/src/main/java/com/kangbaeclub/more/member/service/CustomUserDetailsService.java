package com.kangbaeclub.more.member.service;

import com.kangbaeclub.more.member.dto.CustomUserDetailsDto;
import com.kangbaeclub.more.member.entity.Member;
import com.kangbaeclub.more.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByUsername(username);
        if(member != null) return new CustomUserDetailsDto(member);
        return null;
    }
}
