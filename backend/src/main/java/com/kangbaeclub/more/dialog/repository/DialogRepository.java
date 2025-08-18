package com.kangbaeclub.more.dialog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kangbaeclub.more.dialog.entity.Dialog;
import com.kangbaeclub.more.dialog.entity.DialogId;

@Repository
public interface DialogRepository extends JpaRepository<Dialog, DialogId> {}
