package com.kangbaeclub.more.meeting.entity;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import com.kangbaeclub.more.meeting.repository.RoomRepository;
import com.kangbaeclub.more.organization.entity.Organization;
import com.kangbaeclub.more.organization.repository.OrganizationRepository;
import com.kangbaeclub.more.common.TestFixtureFactory;

@DataJpaTest
@ActiveProfiles("test")
public class RoomEntityTest {

    @Autowired private RoomRepository roomRepository;

    @Autowired private OrganizationRepository organizationRepository;

    private Organization savedOrganization;

    @BeforeEach
    void setUp() {
        savedOrganization = TestFixtureFactory.createOrganization("test org", "url");
        savedOrganization = organizationRepository.save(savedOrganization);
    }

    @Test
    void testRoomEntityMappingAndPersistence() throws Exception {
        // given
        Room room = TestFixtureFactory.createRoom(savedOrganization, "Test Room", 10);

        // when
        Room savedRoom = roomRepository.save(room);
        Room foundRoom = roomRepository.findById(room.getRoomId()).orElse(null);

        // then
        assertThat(savedRoom).isNotNull();
        assertThat(foundRoom).isNotNull();
        assertThat(foundRoom.getRoomId().getOrganizationId())
                .isEqualTo(savedOrganization.getOrganizationId());
        assertThat(foundRoom.getRoomId().getName()).isEqualTo("Test Room");
        assertThat(foundRoom.getOrganization().getOrganizationName()).isEqualTo("test org");
        assertThat(foundRoom.getCapacity()).isEqualTo(10);
    }
}
