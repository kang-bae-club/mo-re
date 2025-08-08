package com.kangbaeclub.more.meeting.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.kangbaeclub.more.organization.entity.Organization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Room {

    @EmbeddedId private RoomId roomId;

    // Room : Organization => N : 1
    @ManyToOne
    @MapsId("organizationId")
    @JoinColumn(name = "organization_id")
    // 추후 엔티티 삭제 이전의 처리 과정에서 추가적인 로직 정의가 필요할 경우, @PreRemove 고려
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Organization organization;

    private int capacity;
}
