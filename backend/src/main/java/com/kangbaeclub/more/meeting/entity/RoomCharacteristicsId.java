package com.kangbaeclub.more.meeting.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RoomCharacteristicsId implements Serializable {
    private String uuid;
    private RoomId roomId;
}
