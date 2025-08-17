package com.kangbaeclub.more.dialog.entity;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;
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
public class DialogEntityTest {

    @Autowired private DialogRepository dialogRepository;

    @Autowired private DialogRecordRepository dialogRecordRepository;

    @Autowired private MemberRepository memberRepository;

    @Autowired private OrganizationRepository organizationRepository;

    @Autowired private DepartmentRepository departmentRepository;

    @Autowired private RoomRepository roomRepository;

    @Autowired private ReservationRepository reservationRepository;

    private Member writer;
    private Reservation reservation;

    @BeforeEach
    void setup() {
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
        writer =
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
        reservation =
                reservationRepository.save(
                        Reservation.builder()
                                .reservationId(reservationId)
                                .room(room)
                                .meetingDate(LocalDate.now())
                                .build());
    }

    @Test
    void testDialogMappingAndPersistence() {
        // given
        DialogId dialogId =
                new DialogId(UUID.randomUUID().toString(), reservation.getReservationId());
        Dialog dialog =
                Dialog.builder()
                        .dialogId(dialogId)
                        .content("Test content")
                        .summary("Test summary")
                        .AISummary("Test AI summary")
                        .writer(writer)
                        .lastModifier(writer)
                        .build();

        // when
        Dialog savedDialog = dialogRepository.save(dialog);
        Dialog foundDialog = dialogRepository.findById(dialogId).orElse(null);

        // then
        assertThat(savedDialog).isNotNull();
        assertThat(foundDialog).isNotNull();
        assertThat(foundDialog.getDialogId()).isEqualTo(dialogId);
        assertThat(foundDialog.getContent()).isEqualTo("Test content");
        assertThat(foundDialog.getWriter().getId()).isEqualTo(writer.getId());
        assertThat(foundDialog.getLastModifier().getId()).isEqualTo(writer.getId());
    }

    @Test
    void testDialogWithRecords() throws Exception {
        // given
        DialogId dialogId =
                new DialogId(UUID.randomUUID().toString(), reservation.getReservationId());

        Dialog dialog =
                Dialog.builder()
                        .dialogId(dialogId)
                        .content("Test content")
                        .summary("Test summary")
                        .AISummary("Test AI summary")
                        .writer(writer)
                        .lastModifier(writer)
                        .build();

        List<DialogRecordId> recordIds =
                List.of(
                        DialogRecordId.builder()
                                .dialogId(dialogId)
                                .uuid(UUID.randomUUID().toString())
                                .build(),
                        DialogRecordId.builder()
                                .dialogId(dialogId)
                                .uuid(UUID.randomUUID().toString())
                                .build(),
                        DialogRecordId.builder()
                                .dialogId(dialogId)
                                .uuid(UUID.randomUUID().toString())
                                .build(),
                        DialogRecordId.builder()
                                .dialogId(dialogId)
                                .uuid(UUID.randomUUID().toString())
                                .build());
        recordIds.stream()
                .map(id -> DialogRecord.builder().dialogRecordId(id).isDeleted(false).build())
                .forEach(record -> dialog.addDialogRecord(record));

        // when
        Dialog savedDialog = dialogRepository.saveAndFlush(dialog);
        Dialog foundDialog = dialogRepository.findById(dialogId).orElseThrow(Exception::new);

        // then
        assertThat(savedDialog).isNotNull();
        assertThat(savedDialog.getRecords()).isNotNull();
        assertThat(foundDialog).isNotNull();
        assertThat(foundDialog.getRecords()).isNotNull();
        assertThat(foundDialog.getRecords())
                .containsExactlyInAnyOrderElementsOf(savedDialog.getRecords());
    }
}
