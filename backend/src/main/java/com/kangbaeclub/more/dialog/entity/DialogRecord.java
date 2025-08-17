package com.kangbaeclub.more.dialog.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DialogRecord {
    @EmbeddedId private DialogRecordId dialogRecordId;
    private String title;
    private String recordFileUrl;
    private Boolean isDeleted;
}
