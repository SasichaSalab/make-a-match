package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.ProductSize;
import com.makeAMatch.makeAMatch.model.UserOrder;
import com.makeAMatch.makeAMatch.model.UserOrderDetail;
import com.makeAMatch.makeAMatch.repository.UserOrderDetailRepository;
import com.makeAMatch.makeAMatch.repository.UserOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserOrderDetailServiceImpl implements UserOrderDetailService{
    @Autowired
    private UserOrderDetailRepository userOrderDetailRepository;
    @Autowired
    private UserOrderRepository userOrderRepository;
    @Override
    public UserOrderDetail saveUserOrder(UserOrderDetail userOrderDetail) {
        return userOrderDetailRepository.save(userOrderDetail);
    }

    @Override
    public void deleteOrderDetail(long id) {
        userOrderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        userOrderDetailRepository.deleteById(id);
    }

    @Override
    public List<Long> getProductSizeIdByOrderId(long id) {
        UserOrder u=userOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        List<Long> p=userOrderDetailRepository.getProductSizeByOrderId(u);
        return p;
    }
}
