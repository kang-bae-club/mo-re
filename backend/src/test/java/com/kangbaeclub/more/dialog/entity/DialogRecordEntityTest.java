package com.kangbaeclub.more.dialog.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.kangbaeclub.more.dialog.repository.DialogRecordRepository;
import com.kangbaeclub.more.dialog.repository.DialogRepository;
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
import com.kangbaeclub.more.reservation.entity.Reservation;
import com.kangbaeclub.more.reservation.entity.ReservationId;
import com.kangbaeclub.more.reservation.repository.ReservationRepository;

@DataJpaTest
@ActiveProfiles("test")
public class DialogRecordEntityTest {

    @Autowired private DialogRecordRepository dialogRecordRepository;

    @Autowired private DialogRepository dialogRepository;

    @Autowired private MemberRepository memberRepository;

    @Autowired private OrganizationRepository organizationRepository;

    @Autowired private DepartmentRepository departmentRepository;

    @Autowired private RoomRepository roomRepository;

    @Autowired private ReservationRepository reservationRepository;

    private Dialog savedDialog;

    @BeforeEach
    void setUp() {
        Organization organization =
                organizationRepository.save(
                        Organization.builder().organizationName("test-org").build());

        DepartmentId departmentId =
                DepartmentId.builder()
                        .organizationId(organization.getOrganizationId())
                        .deptId(1L)
                        .build();
        Department department =
                departmentRepository.save(
                        Department.builder()
                                .departmentId(departmentId)
                                .organization(organization)
                                .deptName("test-dept")
                                .build());

        MemberId memberId =
                MemberId.builder()
                        .memberId("test-writer")
                        .departmentId(department.getDepartmentId())
                        .build();
        Member writer =
                memberRepository.save(
                        Member.builder()
                                .id(memberId)
                                .department(department)
                                .name("Test Writer")
                                .build());

        RoomId roomId = new RoomId(organization.getOrganizationId(), "test-room");
        Room room =
                roomRepository.save(
                        Room.builder()
                                .roomId(roomId)
                                .organization(organization)
                                .capacity(10)
                                .build());

        ReservationId reservationId = new ReservationId(UUID.randomUUID().toString(), roomId);
        Reservation reservation =
                reservationRepository.save(
                        Reservation.builder()
                                .reservationId(reservationId)
                                .room(room)
                                .meetingDate(LocalDate.now())
                                .build());

        DialogId dialogId =
                new DialogId(UUID.randomUUID().toString(), reservation.getReservationId());
        Dialog dialog = Dialog.builder().dialogId(dialogId).writer(writer).build();
        savedDialog = dialogRepository.save(dialog);
    }

    @Test
    void testDialogRecordMappingAndPersistence() {
        // given
        DialogRecordId dialogRecordId =
                DialogRecordId.builder()
                        .uuid("test-uuid")
                        .dialogId(savedDialog.getDialogId())
                        .build();
        DialogRecord dialogRecord =
                DialogRecord.builder()
                        .dialogRecordId(dialogRecordId)
                        .title("Test Record")
                        .recordFileUrl("Test Url")
                        .isDeleted(false)
                        .build();

        // when
        DialogRecord savedDialogRecord = dialogRecordRepository.save(dialogRecord);
        DialogRecord foundDialogRecord =
                dialogRecordRepository.findById(dialogRecordId).orElse(null);

        // then
        assertThat(savedDialogRecord).isNotNull();
        assertThat(foundDialogRecord).isNotNull();
        assertThat(foundDialogRecord.getDialogRecordId()).isEqualTo(dialogRecordId);
        assertThat(foundDialogRecord.getTitle()).isEqualTo("Test Record");
        assertThat(foundDialogRecord.getRecordFileUrl()).isEqualTo("Test Url");
        assertThat(foundDialogRecord.getIsDeleted()).isFalse();
    }
}
