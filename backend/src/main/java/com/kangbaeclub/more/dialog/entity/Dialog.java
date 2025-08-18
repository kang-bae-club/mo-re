package com.kangbaeclub.more.dialog.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import com.kangbaeclub.more.common.entity.BaseTimeEntity;
import com.kangbaeclub.more.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
public class Dialog extends BaseTimeEntity {
    @EmbeddedId private DialogId dialogId;

    @Lob private String content;

    @Lob private String summary;

    @Lob
    @Column(name = "AI_summary")
    private String AISummary;

    @OneToOne
    @JoinColumns({
        @JoinColumn(name = "writer_member_id", referencedColumnName = "memberId"),
        @JoinColumn(name = "writer_dept_id", referencedColumnName = "deptId"),
        @JoinColumn(name = "writer_organization_id", referencedColumnName = "organizationId")
    })
    private Member writer;

    @OneToOne
    @JoinColumns({
        @JoinColumn(name = "last_modifier_id", referencedColumnName = "memberId"),
        @JoinColumn(name = "last_modifier_dept_id", referencedColumnName = "deptId"),
        @JoinColumn(name = "last_modifier_organization_id", referencedColumnName = "organizationId")
    })
    private Member lastModifier;

    /* 1. record는 dialog의 생명주기를 모두 따라간다 (persist, merge, remove, refresh)
    2. OneToMany 단방향 관계에서 FK 정보를 명시하지 않을 경우, 연결 테이블을 생성하여 관계를 매핑 (default)
       이를 원하지 않으므로 명시적으로 JoinColumn 으로 외래키 정보를 Hibernate에게 제공 */
    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumns({
        @JoinColumn(name = "dialog_uuid", referencedColumnName = "uuid"),
        @JoinColumn(name = "reservation_uuid", referencedColumnName = "reservation_uuid"),
        @JoinColumn(name = "room_organization_id", referencedColumnName = "room_organization_id"),
        @JoinColumn(name = "room_name", referencedColumnName = "room_name")
    })
    private List<DialogRecord> records = new ArrayList<>();

    public void addDialogRecord(DialogRecord record) {
        this.records.add(record);
        record.getDialogRecordId().setDialogId(this.getDialogId());
    }

    public Dialog() {
        records = new ArrayList<>();
    }
}
