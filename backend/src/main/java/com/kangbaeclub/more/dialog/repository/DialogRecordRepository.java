package com.kangbaeclub.more.dialog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kangbaeclub.more.dialog.entity.DialogRecord;
import com.kangbaeclub.more.dialog.entity.DialogRecordId;

@Repository
public interface DialogRecordRepository extends JpaRepository<DialogRecord, DialogRecordId> {}
