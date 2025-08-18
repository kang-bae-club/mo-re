package com.kangbaeclub.more.reservation.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

import com.kangbaeclub.more.common.entity.BaseTimeEntity;
import com.kangbaeclub.more.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 예약된 회의에 대한 참석자 정보를 표현하는 테이블입니다.
 *
 * <p>특정 회의({@link Reservation})에 참석하는 참석자({@link Member}) 정보를 저장하는 중간 테이블 입니다.
 *
 * @see Reservation
 * @see Member
 */
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeetingMember extends BaseTimeEntity {
    @EmbeddedId private MeetingMemberId meetingMemberId;

    @ManyToOne
    @MapsId("memberId")
    private Member participant;
}
