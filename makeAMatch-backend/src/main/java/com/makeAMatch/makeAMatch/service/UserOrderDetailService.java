package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.UserOrder;
import com.makeAMatch.makeAMatch.model.UserOrderDetail;

import java.util.List;

public interface UserOrderDetailService {
    UserOrderDetail saveUserOrder(UserOrderDetail userOrderDetail);
    void deleteOrderDetail(long id);

    List<Long> getProductSizeIdByOrderId(long id);
}
