package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.Refund;
import com.makeAMatch.makeAMatch.model.RefundConfirmed;
import com.makeAMatch.makeAMatch.model.RefundStatus;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RefundConfirmController {
    @Autowired
    private RefundConfirmService refundConfirmService;

    @Autowired
    private RefundService refundService;

    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @PostMapping("/admin/confirm-refund/{id}")
    public ResponseEntity<RefundConfirmed> confirmRefund(@PathVariable("id")long id, @RequestHeader(value="Authorization") String authHeader){
        Refund refund=refundService.getRefundById(id);
        refund.setRefundStatus(RefundStatus.SUCCESS);
        refundService.saveRefund(refund);
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        RefundConfirmed refundConfirmed=new RefundConfirmed();
        refundConfirmed.setRefund(refund);
        refundConfirmed.setUser(userId);
        RefundConfirmed saveRefundConfirm=refundConfirmService.saveRefundConfirmed(refundConfirmed);
        return new ResponseEntity<RefundConfirmed>(saveRefundConfirm, HttpStatus.CREATED);
    }

    @PostMapping("/admin/cancel-refund/{id}")
    public ResponseEntity<String> cancelRefund(@PathVariable("id")long id, @RequestHeader(value="Authorization") String authHeader){
        Refund refund=refundService.getRefundById(id);
        refund.setRefundStatus(RefundStatus.CANCEL);
        refundService.saveRefund(refund);
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        RefundConfirmed refundConfirmed=new RefundConfirmed();
        refundConfirmed.setRefund(refund);
        refundConfirmed.setUser(userId);
        RefundConfirmed saveRefundConfirm=refundConfirmService.saveRefundConfirmed(refundConfirmed);
        return new ResponseEntity<String>("cancel refund successfully", HttpStatus.OK);
    }
}
