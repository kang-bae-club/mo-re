package com.kangbaeclub.more.reservation.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonValue;
import com.kangbaeclub.more.common.entity.BaseTimeEntity;
import com.kangbaeclub.more.common.enums.DAY;
import com.kangbaeclub.more.meeting.entity.Room;
import com.kangbaeclub.more.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Reservation extends BaseTimeEntity {

    @EmbeddedId private ReservationId reservationId;

    // TODO: N + 1 문제 발생 방지를 위해서 fetch join 적용
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roomId")
    private Room room;

    private LocalDate meetingDate;
    private DAY meetingDay;
    private LocalTime openedAt;
    private LocalTime closedAt;
    private String agenda;
    private String notification;

    @Enumerated(EnumType.STRING)
    private RESERVATION_STATUS status;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member organizer;
}

@Getter
enum RESERVATION_STATUS {
    PENDING("예약대기중"),
    RESERVED("예약중"),
    IN_PROGRESS("회의중"),
    DONE("완료");

    private final String name;

    RESERVATION_STATUS(String name) {
        this.name = name;
    }

    @JsonValue
    public String getName() {
        return this.name;
    }
}
