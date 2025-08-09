package com.kangbaeclub.more.meeting.entity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.kangbaeclub.more.meeting.repository.RoomCharacteristicsRepository;
import com.kangbaeclub.more.organization.entity.Organization;
import com.kangbaeclub.more.organization.repository.OrganizationRepository;

@DataJpaTest
@ActiveProfiles("test")
public class RoomCharacteristicsEntityTest {

    @Autowired private RoomCharacteristicsRepository roomCharacteristicsRepository;

    @Autowired private OrganizationRepository organizationRepository;

    private Organization savedOrganization;

    @BeforeEach
    void setUp() {
        // 테스트에 필요한 Organization 엔티티를 미리 저장합니다.
        Organization organization = new Organization(0, "Test Organization name", "url");
        savedOrganization = organizationRepository.save(organization);
    }

    @Test
    void testRoomCharacteristicsMappingAndPersistence() {
        // given: 테스트할 RoomCharacteristics 객체를 생성합니다.
        RoomCharacteristicsId roomCharacteristicsId =
                new RoomCharacteristicsId(
                        "uuid1",
                        new RoomId(
                                savedOrganization.getOrganizationId(),
                                savedOrganization.getOrganizationName()));

        RoomCharacteristics characteristics =
                new RoomCharacteristics(roomCharacteristicsId, "test description");

        // when: 엔티티를 데이터베이스에 저장합니다.
        RoomCharacteristics savedCharacteristics =
                roomCharacteristicsRepository.save(characteristics);
        RoomCharacteristics foundCharacteristics =
                roomCharacteristicsRepository.findById(roomCharacteristicsId).orElse(null);

        assertThat(savedCharacteristics).isNotNull();
        assertThat(foundCharacteristics).isNotNull();

        // 복합 키(RoomId)의 값이 올바르게 저장되었는지 확인합니다.
        assertThat(foundCharacteristics.getId()).isEqualTo(roomCharacteristicsId);
        assertThat(foundCharacteristics.getId().getRoomId())
                .isEqualTo(roomCharacteristicsId.getRoomId());

        // description 필드의 값이 올바르게 저장되었는지 확인합니다.
        assertThat(foundCharacteristics.getDescription()).isEqualTo("test description");
    }
}
