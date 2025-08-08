package com.kangbaeclub.more.meeting.entity;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.kangbaeclub.more.meeting.repository.RoomRepository;
import com.kangbaeclub.more.organization.entity.Organization;
import com.kangbaeclub.more.organization.repository.OrganizationRepository;

@DataJpaTest
public class RoomEntityTest {

    @Autowired private RoomRepository roomRepository;

    @Autowired private OrganizationRepository organizationRepository;

    private Organization savedOrganization;

    @BeforeEach
    void setUp() {
        organizationRepository.deleteAll();
        roomRepository.deleteAll();

        Organization organization = new Organization(0, "Test Org", "url");
        savedOrganization = organizationRepository.save(organization);

        RoomId roomId1 = new RoomId(savedOrganization.getOrganizationId(), "room1");
        RoomId roomId2 = new RoomId(savedOrganization.getOrganizationId(), "room2");
    }

    @Test
    void testRoomEntityMappingAndPersistence() throws Exception {
        // given
        RoomId roomId = new RoomId(savedOrganization.getOrganizationId(), "Test Room");
        Room room = new Room(roomId, savedOrganization, 10);

        // when
        Room savedRoom = roomRepository.save(room);
        Room foundRoom = roomRepository.findById(roomId).orElse(null);

        // then
        assertThat(savedRoom).isNotNull();
        assertThat(foundRoom).isNotNull();
        assertThat(foundRoom.getRoomId().getOrganizationId())
                .isEqualTo(savedOrganization.getOrganizationId());
        assertThat(foundRoom.getRoomId().getName()).isEqualTo("Test Room");
        assertThat(foundRoom.getOrganization().getOrganizationName()).isEqualTo("Test Org");
        assertThat(foundRoom.getCapacity()).isEqualTo(10);
    }
}
