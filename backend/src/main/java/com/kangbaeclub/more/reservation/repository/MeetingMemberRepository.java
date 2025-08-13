package com.kangbaeclub.more.reservation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kangbaeclub.more.reservation.entity.MeetingMember;
import com.kangbaeclub.more.reservation.entity.MeetingMemberId;
import com.kangbaeclub.more.reservation.entity.ReservationId;

@Repository
public interface MeetingMemberRepository extends JpaRepository<MeetingMember, MeetingMemberId> {
    @Query(
            "SELECT M FROM MeetingMember M WHERE M.meetingMemberId.reservationId.roomId = :#{#reservationId.roomId} AND M.meetingMemberId.reservationId.uuid = :#{#reservationId.uuid}")
    List<MeetingMember> findByReservationId(@Param("reservationId") ReservationId reservationId);
}
