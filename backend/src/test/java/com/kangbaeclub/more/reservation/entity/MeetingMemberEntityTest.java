package com.kangbaeclub.more.reservation.entity;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
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
import com.kangbaeclub.more.reservation.repository.MeetingMemberRepository;
import com.kangbaeclub.more.reservation.repository.ReservationRepository;

@DataJpaTest
public class MeetingMemberEntityTest {

    @Autowired private MeetingMemberRepository meetingMemberRepository;

    @Autowired private OrganizationRepository organizationRepository;

    @Autowired private MemberRepository memberRepository;

    @Autowired private RoomRepository roomRepository;

    @Autowired private ReservationRepository reservationRepository;

    @Autowired private DepartmentRepository departmentRepository;

    private Reservation testReservation;
    private List<Member> testParticipants;

    @BeforeEach
    public void setup() {
        Organization organization =
                Organization.builder()
                        .organizationName("testOrg")
                        .organizationPictureUrl("testUrl")
                        .build();
        organization = organizationRepository.saveAndFlush(organization);

        Room room =
                Room.builder()
                        .roomId(RoomId.builder().name("roomName").build())
                        .capacity(10)
                        .organization(organization)
                        .build();
        room = roomRepository.saveAndFlush(room);

        // 1. set reservation entity for test
        testReservation =
                Reservation.builder()
                        .reservationId(
                                ReservationId.builder()
                                        .roomId(room.getRoomId())
                                        .uuid("testReservation_UUID")
                                        .build())
                        .meetingDate(LocalDate.now())
                        .meetingDay(DAY.FRIDAY)
                        .openedAt(LocalTime.now())
                        .closedAt(LocalTime.now())
                        .room(room)
                        .build();
        testReservation = reservationRepository.saveAndFlush(testReservation);

        // 2. set list of members for test
        Department department =
                Department.builder()
                        .departmentId(DepartmentId.builder().deptId(0L).build())
                        .deptName("testDepartment")
                        .organization(organization)
                        .build();
        department = departmentRepository.saveAndFlush(department);

        Member member1 =
                Member.builder()
                        .username("testUser1")
                        .id(
                                MemberId.builder()
                                        .memberId("member1")
                                        .departmentId(new DepartmentId())
                                        .build())
                        .department(department)
                        .name("KANG")
                        .build();
        Member member2 =
                Member.builder()
                        .username("testUser2")
                        .id(
                                MemberId.builder()
                                        .memberId("member2")
                                        .departmentId(new DepartmentId())
                                        .build())
                        .department(department)
                        .name("MIN")
                        .build();
        Member member3 =
                Member.builder()
                        .username("testUser3")
                        .id(
                                MemberId.builder()
                                        .memberId("member3")
                                        .departmentId(new DepartmentId())
                                        .build())
                        .department(department)
                        .name("JUN")
                        .build();

        testParticipants =
                List.of(member1, member2, member3).stream()
                        .map(e -> memberRepository.saveAndFlush(e))
                        .toList();
    }

    @Test
    void meetingMember_persist_and_find_with_correct_embbedId_test() throws Exception {
        testParticipants.stream()
                .forEach(
                        p -> {
                            MeetingMember meetingMember =
                                    MeetingMember.builder()
                                            .meetingMemberId(
                                                    MeetingMemberId.builder()
                                                            .reservationId(
                                                                    testReservation
                                                                            .getReservationId())
                                                            .memberId(p.getId())
                                                            .build())
                                            .participant(p)
                                            .build();
                            meetingMemberRepository.saveAndFlush(meetingMember);
                        });

        List<MeetingMember> savedParticipants =
                meetingMemberRepository.findByReservationId(testReservation.getReservationId());

        assertThat(savedParticipants.size()).isEqualTo(testParticipants.size());
        assertThat(savedParticipants)
                .extracting(MeetingMember::getParticipant)
                .containsExactlyInAnyOrderElementsOf(testParticipants);
    }
}
