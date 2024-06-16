package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OrderConfirmed;
import com.makeAMatch.makeAMatch.model.OrderStatus;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.UserOrder;
import com.makeAMatch.makeAMatch.repository.OrderConfirmedRepository;
import com.makeAMatch.makeAMatch.repository.UserOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserOrderServiceImpl implements UserOrderService{
    @Autowired
    private UserOrderRepository userOrderRepository;

    @Autowired
    private OrderConfirmedRepository orderConfirmedRepository;

    @Override
    public UserOrder saveOrder(UserOrder userOrder) {
        return userOrderRepository.save(userOrder);
    }

    @Override
    public List<UserOrder> getAllOrders(OurUsers users, OrderStatus status) {
        return userOrderRepository.getAllOrders(users,status);
    }

    @Override
    public Integer getSumOrder(OurUsers users, OrderStatus status) {
        return userOrderRepository.getTotalOrderForUser(users,status);
    }

    @Override
    public List<UserOrder> getAllConfirmedOrdersByUserAdminId(long id) {
        return userOrderRepository.findAllConfirmedOrdersByUserAdminId(id);
    }

    @Override
    public List<UserOrder> getAllCancelOrdersByUserAdminId(long id) {
        return userOrderRepository.findAllCancelOrdersByUserAdminId(id);
    }

    @Override
    public List<UserOrder> getAllOrdersForAdmin() {
        return userOrderRepository.getAllAdminOrders(OrderStatus.WAITING);
    }

    @Override
    public Integer getTotalOrdersForAdmin(OrderStatus status) {
        return userOrderRepository.getTotalAdminOrders(status);
    }

    @Override
    public void deleteOrder(long id) {
        userOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        userOrderRepository.deleteById(id);
    }

    @Override
    public void UserConfirmOrder(long orderId) {
        UserOrder userOrder=userOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        userOrder.setOrderStatus(OrderStatus.SUCCESS);
        userOrderRepository.save(userOrder);
    }

    @Override
    public OrderConfirmed AdminConfirm(long orderId,OurUsers ourUsers) {
        UserOrder userOrder=userOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        userOrder.setOrderStatus(OrderStatus.SENDING);
        OrderConfirmed orderConfirmed=new OrderConfirmed();
        orderConfirmed.setUser(ourUsers);
        orderConfirmed.setUserOrderConfirm(userOrder);
        return orderConfirmedRepository.save(orderConfirmed);
    }
    @Override
    public OrderConfirmed AdminCancel(long orderId,OurUsers ourUsers) {
        UserOrder userOrder=userOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        userOrder.setOrderStatus(OrderStatus.CANCEL);
        OrderConfirmed orderConfirmed=new OrderConfirmed();
        orderConfirmed.setUser(ourUsers);
        orderConfirmed.setUserOrderConfirm(userOrder);
        return orderConfirmedRepository.save(orderConfirmed);
    }

    @Override
    public UserOrder getUserOrderById(long id) {
        return userOrderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
}
