package com.kangbaeclub.more.meeting.entity;

import java.io.Serializable;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomCharacteristics implements Serializable {
    @EmbeddedId private RoomCharacteristicsId id;
    private String description;
}
