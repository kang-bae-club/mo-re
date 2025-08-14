package com.kangbaeclub.more.reservation.entity;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.kangbaeclub.more.common.enums.DAY;
import com.kangbaeclub.more.meeting.entity.Room;
import com.kangbaeclub.more.meeting.entity.RoomId;
import com.kangbaeclub.more.meeting.repository.RoomRepository;
import com.kangbaeclub.more.member.entity.Department;
import com.kangbaeclub.more.member.entity.DepartmentId;
import com.kangbaeclub.more.member.entity.Member;
import com.kangbaeclub.more.member.entity.MemberId;
import com.kangbaeclub.more.member.repository.DepartmentRepository;
import com.kangbaeclub.more.member.repository.MemberRepository;
import com.kangbaeclub.more.organization.entity.Organization;
import com.kangbaeclub.more.organization.repository.OrganizationRepository;
import com.kangbaeclub.more.reservation.repository.ReservationRepository;
import com.kangbaeclub.more.common.TestFixtureFactory;

@DataJpaTest
class ReservationEntityTest {

    @Autowired private ReservationRepository reservationRepository;

    @Autowired private OrganizationRepository organizationRepository;

    @Autowired private DepartmentRepository departmentRepository;

    @Autowired private MemberRepository memberRepository;

    @Autowired private RoomRepository roomRepository;

    private Organization testOrganization;

    private Department testDepartment;

    private Member testOrganizer;
    private Room testRoom;

    @BeforeEach
    void setUp() {
        // 1. setup the `organization entity`
        testOrganization = TestFixtureFactory.createOrganization("testName", "testUrl");
        testOrganization = organizationRepository.saveAndFlush(testOrganization);

        // 2. setup the `department entity`
        testDepartment = TestFixtureFactory.createDepartment(testOrganization, 1L, "test Dept");
        testDepartment = departmentRepository.saveAndFlush(testDepartment);

        // 3. setup the `member entity`
        testOrganizer = TestFixtureFactory.createMember(testDepartment, "TEST_USER", "testUser", "testUsername");
        testOrganizer = memberRepository.saveAndFlush(testOrganizer);

        // 4. setup the `room entity`
        testRoom = TestFixtureFactory.createRoom(testOrganization, "testRoom", 20);
        testRoom = roomRepository.saveAndFlush(testRoom);
    }

    @Test
    @DisplayName("Reservation 엔티티 저장 및 실제 복합키 조회 테스트")
    void reservation_persist_and_find_with_correct_embeddedId_test() throws Exception {
        // given
        String reservationUuid = UUID.randomUUID().toString();
        ReservationId reservationId =
                ReservationId.builder().uuid(reservationUuid).roomId(testRoom.getRoomId()).build();
        LocalDate meetingDate = LocalDate.of(2025, 10, 27);

        Reservation reservation =
                Reservation.builder()
                        .reservationId(reservationId)
                        .meetingDate(meetingDate)
                        .room(testRoom)
                        .organizer(testOrganizer)
                        .meetingDay(DAY.MONDAY)
                        .openedAt(LocalTime.of(10, 0))
                        .closedAt(LocalTime.of(11, 30))
                        .agenda("test agenda")
                        .status(RESERVATION_STATUS.RESERVED)
                        .build();

        // when
        reservationRepository.saveAndFlush(reservation);

        // then
        Reservation foundReservation =
                reservationRepository.findById(reservationId).orElseThrow(Exception::new);

        assertThat(foundReservation).isNotNull();
        assertThat(foundReservation.getReservationId()).isEqualTo(reservationId);
        assertThat(foundReservation.getReservationId().getUuid()).isEqualTo(reservationUuid);
        assertThat(foundReservation.getAgenda()).isEqualTo("test agenda");
        assertThat(foundReservation.getStatus()).isEqualTo(RESERVATION_STATUS.RESERVED);
        assertThat(foundReservation.getMeetingDate()).isEqualTo(meetingDate);

        // 연관관계 검증
        assertThat(foundReservation.getOrganizer().getUsername())
                .isEqualTo(testOrganizer.getUsername());
        assertThat(foundReservation.getRoom().getRoomId()).isEqualTo(testRoom.getRoomId());

        // BaseTimeEntity Auditing 기능 검증
        assertThat(foundReservation.getCreatedAt()).isNotNull();
        assertThat(foundReservation.getUpdatedAt()).isNotNull();
    }
}
