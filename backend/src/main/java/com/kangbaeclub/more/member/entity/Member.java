package com.kangbaeclub.more.member.entity;

import java.util.Date;

import jakarta.persistence.*;

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
public class Member {
    @EmbeddedId private MemberId id;
    private String password;
    private String name;
    private String phone;
    private String email;
    private String position;
    private String profileUrl;
    private int isLeave;
    private Date joinedDate;
    private String username;
    private String role;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("departmentId")
    private Department department;

    public void createMember(String username, String role) {
        this.username = username;
        this.role = role;
    }
}
