package com.kangbaeclub.more.meeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kangbaeclub.more.meeting.entity.RoomCharacteristics;
import com.kangbaeclub.more.meeting.entity.RoomCharacteristicsId;

@Repository
public interface RoomCharacteristicsRepository
        extends JpaRepository<RoomCharacteristics, RoomCharacteristicsId> {}
