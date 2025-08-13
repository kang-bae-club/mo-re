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

@DataJpaTest
public class MemberEntityTest {

    @Autowired private OrganizationRepository organizationRepository;

    @Autowired private MemberRepository memberRepository;

    @Autowired private DepartmentRepository departmentRepository;

    private Organization testOrganization;
    private Department testDepartment;

    @BeforeEach
    void setup() {
        testOrganization =
                organizationRepository.saveAndFlush(
                        Organization.builder()
                                .organizationName("test org")
                                .organizationPictureUrl("testurl")
                                .build());

        DepartmentId departmentId =
                DepartmentId.builder()
                        .deptId(0L)
                        .organizationId(testOrganization.getOrganizationId())
                        .build();
        testDepartment =
                departmentRepository.saveAndFlush(
                        Department.builder()
                                .departmentId(departmentId)
                                .organization(testOrganization)
                                .build());
    }

    @Test
    @DisplayName("member 엔티티 저장 및 실제 복합키 조회 테스트")
    void member_persist_and_find_with_correct_embeddedId_test() {
        MemberId memberId =
                MemberId.builder()
                        .memberId("testUser")
                        .departmentId(testDepartment.getDepartmentId())
                        .build();
        Member member =
                Member.builder().id(memberId).name("testName").department(testDepartment).build();
        Member savedMember = memberRepository.save(member);
        assertThat(savedMember).isNotNull();
        assertThat(savedMember).isEqualTo(member);
    }
}
