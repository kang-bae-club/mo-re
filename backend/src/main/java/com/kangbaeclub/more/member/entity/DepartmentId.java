package com.kangbaeclub.more.member.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DepartmentId implements Serializable {
    private Long deptId;
    private Long organizationId;
}
