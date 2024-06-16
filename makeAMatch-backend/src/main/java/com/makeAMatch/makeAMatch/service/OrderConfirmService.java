package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OrderConfirmed;
import com.makeAMatch.makeAMatch.model.UserOrder;

public interface OrderConfirmService {
    OrderConfirmed saveOrderConfirm(OrderConfirmed orderConfirmed);

    void deleteOrderConfirmed(UserOrder userOrder);

}
