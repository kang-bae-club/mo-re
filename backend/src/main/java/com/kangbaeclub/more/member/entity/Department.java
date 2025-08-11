package com.kangbaeclub.more.member.entity;

import jakarta.persistence.*;

import com.kangbaeclub.more.organization.entity.Organization;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Builder
public class Department {
    @EmbeddedId private DepartmentId departmentId;
    private String deptName;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("organizationId")
    // organization.id -> this.id.organizationId로 단방향 자동 매핑
    private Organization organization;
}
