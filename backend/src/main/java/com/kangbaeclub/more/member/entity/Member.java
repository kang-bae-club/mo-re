package com.kangbaeclub.more.member.entity;

import java.util.Date;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    public void createMember(String username, String role) {
        this.username = username;
        this.role = role;
    }
}
