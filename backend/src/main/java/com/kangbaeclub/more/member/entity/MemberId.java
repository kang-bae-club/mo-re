package com.kangbaeclub.more.member.entity;

import java.io.Serializable;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberId implements Serializable {
    private int memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Department department;
}
