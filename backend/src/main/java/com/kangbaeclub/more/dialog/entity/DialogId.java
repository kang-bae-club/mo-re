package com.kangbaeclub.more.dialog.entity;

import java.io.Serializable;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import com.kangbaeclub.more.reservation.entity.ReservationId;

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
public class DialogId implements Serializable {
    private String uuid;

    @AttributeOverrides({
        @AttributeOverride(name = "uuid", column = @Column(name = "reservation_uuid")),
        @AttributeOverride(
                name = "room_organization_id",
                column = @Column(name = "organization_id")),
        @AttributeOverride(name = "room_name", column = @Column(name = "room_name"))
    })
    private ReservationId reservationId;

    public DialogId() {
        reservationId = new ReservationId();
    }
}
