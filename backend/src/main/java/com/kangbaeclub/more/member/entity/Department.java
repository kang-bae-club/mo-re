package com.kangbaeclub.more.member.entity;

import com.kangbaeclub.more.organization.entity.Organization;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Department {
    @EmbeddedId
    private DepartmentId id;
    private String deptName;
}
