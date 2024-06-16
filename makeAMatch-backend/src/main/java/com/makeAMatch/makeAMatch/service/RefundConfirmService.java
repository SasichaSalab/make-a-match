package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundConfirmed;
import com.makeAMatch.makeAMatch.model.UserOrder;

public interface RefundConfirmService {
    RefundConfirmed saveRefundConfirmed(RefundConfirmed refundConfirmed);
    void deleteRefundConfirmedByRefund(Refund refund);
}
