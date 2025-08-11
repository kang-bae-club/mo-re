package com.kangbaeclub.more.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kangbaeclub.more.member.entity.Department;
import com.kangbaeclub.more.member.entity.DepartmentId;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, DepartmentId> {}
