package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.OrderStatus;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserOrderRepository extends JpaRepository<UserOrder,Long> {

    @Query("SELECT DISTINCT u FROM UserOrder u WHERE u.user = :user AND u.orderStatus= :status")
    List<UserOrder> getAllOrders(@Param("user") OurUsers user, @Param("status")OrderStatus status);

    @Query("SELECT COUNT(u) FROM UserOrder u WHERE u.user = :user AND u.orderStatus= :status")
    Integer getTotalOrderForUser(@Param("user") OurUsers user, @Param("status")OrderStatus status);

    @Query("SELECT DISTINCT u FROM UserOrder u WHERE u.orderStatus= :status")
    List<UserOrder> getAllAdminOrders(@Param("status")OrderStatus status);
    @Query("SELECT COUNT(u) FROM UserOrder u WHERE u.orderStatus= :status")
    Integer getTotalAdminOrders(@Param("status")OrderStatus status);
    @Query("SELECT uo FROM UserOrder uo JOIN uo.orderConfirmed oc WHERE oc.user.id = :userId AND (uo.orderStatus=SENDING OR uo.orderStatus=SUCCESS)")
    List<UserOrder> findAllConfirmedOrdersByUserAdminId(@Param("userId") long userId);
    @Query("SELECT uo FROM UserOrder uo JOIN uo.orderConfirmed oc WHERE oc.user.id = :userId AND uo.orderStatus=CANCEL")
    List<UserOrder> findAllCancelOrdersByUserAdminId(@Param("userId") long userId);
}
