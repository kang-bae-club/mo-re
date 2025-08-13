package com.kangbaeclub.more.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kangbaeclub.more.reservation.entity.Reservation;
import com.kangbaeclub.more.reservation.entity.ReservationId;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, ReservationId> {}
