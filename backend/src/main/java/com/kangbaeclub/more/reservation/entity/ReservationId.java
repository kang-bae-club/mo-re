package com.kangbaeclub.more.reservation.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

import com.kangbaeclub.more.meeting.entity.RoomId;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class ReservationId implements Serializable {
    private String uuid;
    private RoomId roomId;
}
