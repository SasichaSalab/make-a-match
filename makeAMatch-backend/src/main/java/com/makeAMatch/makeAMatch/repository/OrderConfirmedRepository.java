package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.OrderConfirmed;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.RefundConfirmed;
import com.makeAMatch.makeAMatch.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderConfirmedRepository extends JpaRepository<OrderConfirmed,Long> {

    @Query("SELECT o.order_confirmed_id FROM OrderConfirmed o WHERE o.userOrderConfirm = :userOrderConfirm")
    long findConfirmIdByUserOrderId(@Param("userOrderConfirm") UserOrder userOrder);

    @Query("SELECT DISTINCT o FROM OrderConfirmed o WHERE o.user = :user")
    List<RefundConfirmed> findAdminConfirm(@Param("user") OurUsers user);

}
