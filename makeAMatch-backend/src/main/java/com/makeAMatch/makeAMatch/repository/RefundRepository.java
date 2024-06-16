package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RefundRepository extends JpaRepository<Refund,Long> {

    @Query("SELECT DISTINCT r FROM Refund r WHERE r.ourUsers = :userId AND r.refundStatus=:refundStatus")
    List<Refund> getAllRefundUser(@Param("userId")OurUsers userId,@Param("refundStatus")RefundStatus refundStatus);
    @Query("SELECT COUNT(r) FROM Refund r WHERE r.ourUsers = :userId AND r.refundStatus=:refundStatus")
    Integer getTotalRefundUser(@Param("userId")OurUsers userId,@Param("refundStatus")RefundStatus refundStatus);
    @Query("SELECT DISTINCT r FROM Refund r WHERE r.refundStatus=:refundStatus")
    List<Refund> getAllRefunds(@Param("refundStatus")RefundStatus refundStatus);

    @Query("SELECT COUNT(r) FROM Refund r WHERE r.refundStatus=:refundStatus")
    Integer getTotalRefundAdmin(@Param("refundStatus")RefundStatus refundStatus);
}
