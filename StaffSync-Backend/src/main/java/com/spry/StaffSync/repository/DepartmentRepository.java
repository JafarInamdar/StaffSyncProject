package com.spry.StaffSync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spry.StaffSync.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{

}
