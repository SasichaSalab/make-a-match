package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundConfirmed;
import com.makeAMatch.makeAMatch.repository.RefundConfirmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RefundConfirmServiceImpl implements RefundConfirmService{
    @Autowired
    private RefundConfirmRepository refundConfirmRepository;
    @Override
    public RefundConfirmed saveRefundConfirmed(RefundConfirmed refundConfirmed) {
        return refundConfirmRepository.save(refundConfirmed);
    }

    @Override
    public void deleteRefundConfirmedByRefund(Refund refund) {
        Long refundConfirmed=refundConfirmRepository.findConfirmIdByRefund(refund);
        refundConfirmRepository.findById(refundConfirmed)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + refundConfirmed));
        refundConfirmRepository.deleteById(refundConfirmed);
    }
}
