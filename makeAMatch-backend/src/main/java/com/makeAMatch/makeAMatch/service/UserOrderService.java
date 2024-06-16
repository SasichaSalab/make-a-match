package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OrderConfirmed;
import com.makeAMatch.makeAMatch.model.OrderStatus;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.UserOrder;

import java.util.List;

public interface UserOrderService {
    UserOrder saveOrder(UserOrder userOrder);

    List<UserOrder> getAllOrders(OurUsers users, OrderStatus status);
    Integer getSumOrder(OurUsers users, OrderStatus status);
    List<UserOrder> getAllConfirmedOrdersByUserAdminId(long id);
    List<UserOrder> getAllCancelOrdersByUserAdminId(long id);
    List<UserOrder> getAllOrdersForAdmin();
    Integer getTotalOrdersForAdmin(OrderStatus status);

    void deleteOrder(long id);

    void UserConfirmOrder(long orderId);
    OrderConfirmed AdminConfirm(long orderId,OurUsers ourUsers);
    OrderConfirmed AdminCancel(long orderId,OurUsers ourUsers);

    UserOrder getUserOrderById(long id);
}
