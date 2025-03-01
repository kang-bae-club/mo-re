package com.kangbaeclub.more.member.repository;

import com.kangbaeclub.more.member.entity.Refresh;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {
    Boolean existsByRefresh(String refresh);
    List<Refresh> findByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);

    @Transactional
    void deleteAllByRefresh(String refresh);
}
