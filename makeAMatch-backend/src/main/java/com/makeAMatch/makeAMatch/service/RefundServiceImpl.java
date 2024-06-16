package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundStatus;
import com.makeAMatch.makeAMatch.repository.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RefundServiceImpl implements RefundService{
    @Autowired
    private RefundRepository refundRepository;
    @Override
    public List<Refund> getAllRefund() {
        return refundRepository.getAllRefunds(RefundStatus.WAITING);
    }

    @Override
    public Refund saveRefund(Refund refund) {
        return refundRepository.save(refund);
    }

    @Override
    public void deleteRefund(long id) {
        refundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refund not found with id: " + id));
        refundRepository.deleteById(id);
    }

    @Override
    public List<Refund> getAllUserRefund(OurUsers ourUsers,RefundStatus refundStatus) {
        return refundRepository.getAllRefundUser(ourUsers,refundStatus);
    }

    @Override
    public Refund getRefundById(long id) {
        return refundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Refund not found with id: " + id));
    }

    @Override
    public Integer getSumAdminRefund(RefundStatus refundStatus) {
        return refundRepository.getTotalRefundAdmin(refundStatus);
    }

    @Override
    public Integer getSumUserRefund(OurUsers ourUsers, RefundStatus refundStatus) {
        return refundRepository.getTotalRefundUser(ourUsers,refundStatus);
    }
}
