package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundConfirmed;
import com.makeAMatch.makeAMatch.model.RefundStatus;

import java.util.List;

public interface RefundService {
    List<Refund> getAllRefund();
    Refund saveRefund(Refund refund);

    void deleteRefund(long id);
    List<Refund> getAllUserRefund(OurUsers ourUsers, RefundStatus refundStatus);

    Refund getRefundById(long id);
    Integer getSumAdminRefund(RefundStatus refundStatus);
    Integer getSumUserRefund(OurUsers ourUsers, RefundStatus refundStatus);
}
