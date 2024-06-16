package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OrderConfirmed;
import com.makeAMatch.makeAMatch.model.UserOrder;
import com.makeAMatch.makeAMatch.repository.OrderConfirmedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderConfirmServiceImpl implements OrderConfirmService{

    @Autowired
    private OrderConfirmedRepository orderConfirmedRepository;
    @Override
    public OrderConfirmed saveOrderConfirm(OrderConfirmed orderConfirmed) {
        return orderConfirmedRepository.save(orderConfirmed);
    }

    @Override
    public void deleteOrderConfirmed(UserOrder userOrder) {
        long orderConfirmed=orderConfirmedRepository.findConfirmIdByUserOrderId(userOrder);
        System.out.println(orderConfirmed);
        orderConfirmedRepository.findById(orderConfirmed)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderConfirmed));
        orderConfirmedRepository.deleteById(orderConfirmed);
    }
}
