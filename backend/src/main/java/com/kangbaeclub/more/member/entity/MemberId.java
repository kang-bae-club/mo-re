package com.kangbaeclub.more.member.entity;

import com.kangbaeclub.more.organization.entity.Organization;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberId implements Serializable {
    private int memberId;
    @ManyToOne(fetch = FetchType.LAZY)
    private Department department;
}
