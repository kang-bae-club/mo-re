package com.kangbaeclub.more.reservation.entity;

import java.io.Serializable;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import com.kangbaeclub.more.meeting.entity.RoomId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class ReservationId implements Serializable {
    private String uuid;

    @AttributeOverrides({
        @AttributeOverride(
                name = "organizationId",
                column = @Column(name = "room_organization_id")),
        @AttributeOverride(name = "name", column = @Column(name = "room_name"))
    })
    private RoomId roomId;

    public ReservationId() {
        roomId = new RoomId();
    }
}
