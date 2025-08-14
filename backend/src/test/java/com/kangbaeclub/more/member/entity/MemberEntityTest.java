package com.kangbaeclub.more.member.entity;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.kangbaeclub.more.member.repository.DepartmentRepository;
import com.kangbaeclub.more.member.repository.MemberRepository;
import com.kangbaeclub.more.organization.entity.Organization;
import com.kangbaeclub.more.organization.repository.OrganizationRepository;
import com.kangbaeclub.more.common.TestFixtureFactory;

@DataJpaTest
public class MemberEntityTest {

    @Autowired private OrganizationRepository organizationRepository;

    @Autowired private MemberRepository memberRepository;

    @Autowired private DepartmentRepository departmentRepository;

    private Organization testOrganization;
    private Department testDepartment;

    @BeforeEach
    void setup() {
        testOrganization = TestFixtureFactory.createOrganization("test org", "testurl");
        testOrganization = organizationRepository.saveAndFlush(testOrganization);

        testDepartment = TestFixtureFactory.createDepartment(testOrganization, 0L, null);
        testDepartment = departmentRepository.saveAndFlush(testDepartment);
    }

    @Test
    @DisplayName("member 엔티티 저장 및 실제 복합키 조회 테스트")
    void member_persist_and_find_with_correct_embeddedId_test() {
        Member member = TestFixtureFactory.createMember(testDepartment, "testUser", "testName", null);
        Member savedMember = memberRepository.save(member);
        assertThat(savedMember).isNotNull();
        assertThat(savedMember).isEqualTo(member);
    }
}
