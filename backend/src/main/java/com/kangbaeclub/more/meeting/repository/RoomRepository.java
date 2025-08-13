package com.kangbaeclub.more.meeting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kangbaeclub.more.meeting.entity.Room;
import com.kangbaeclub.more.meeting.entity.RoomId;

public interface RoomRepository extends JpaRepository<Room, RoomId> {}
