package com.kangbaeclub.more.member.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Refresh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String refreshUsername;
    private String refresh;
    private String refreshTime;

    public void createRefresh(String refreshUsername, String refresh, String refreshTime) {
        this.refreshUsername = refreshUsername;
        this.refresh = refresh;
        this.refreshTime = refreshTime;
    }
}
