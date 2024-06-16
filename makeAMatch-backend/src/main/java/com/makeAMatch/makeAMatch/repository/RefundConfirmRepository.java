package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundConfirmed;
import com.makeAMatch.makeAMatch.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RefundConfirmRepository extends JpaRepository<RefundConfirmed,Long> {
    @Query("SELECT r.refund_confirmed_id FROM RefundConfirmed r WHERE r.refund = :refund")
    Long findConfirmIdByRefund(@Param("refund")Refund refund);

    @Query("SELECT DISTINCT r FROM RefundConfirmed r WHERE r.user = :user")
    List<RefundConfirmed> findAdminRefund(@Param("user")OurUsers user);
}
