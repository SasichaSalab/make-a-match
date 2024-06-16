package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.OrderStatus;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.UserOrder;
import com.makeAMatch.makeAMatch.model.UserOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserOrderDetailRepository extends JpaRepository<UserOrderDetail,Long> {
    @Query("SELECT u.productSize FROM UserOrderDetail u WHERE u.userOrder = :user")
    List<Long> getProductSizeByOrderId(@Param("user") UserOrder user);
}
