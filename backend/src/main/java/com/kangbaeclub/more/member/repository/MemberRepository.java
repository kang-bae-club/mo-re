package com.kangbaeclub.more.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kangbaeclub.more.member.entity.Member;
import com.kangbaeclub.more.member.entity.MemberId;

public interface MemberRepository extends JpaRepository<Member, MemberId> {
    Member findByUsername(String username);
}
