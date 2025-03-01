package com.kangbaeclub.more.member.repository;

import com.kangbaeclub.more.member.entity.Member;
import com.kangbaeclub.more.member.entity.MemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, MemberId> {
    Member findByUsername(String username);
}
