package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.dto.RefundDTO;
import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RefundController {
    @Autowired
    private RefundService refundService;
    @Autowired
    private OurUserDetailsService ourUserDetailsService;
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserOrderService userOrderService;

    @Autowired
    private RefundConfirmService refundConfirmService;

    @GetMapping("/admin/refund")
    public List<Refund> getAllRefunds(){
        return refundService.getAllRefund();
    }

    @PostMapping("/admin/refund-confirm/{id}")
    public RefundConfirmed adminConfirm(@RequestHeader(value="Authorization") String authHeader,@PathVariable("id")long id){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        Refund refund=refundService.getRefundById(id);
        RefundConfirmed refundConfirmed=new RefundConfirmed();
        refundConfirmed.setUser(userId);
        refundConfirmed.setRefund(refund);
        refund.setRefundStatus(RefundStatus.SUCCESS);
        refundService.saveRefund(refund);
        return refundConfirmService.saveRefundConfirmed(refundConfirmed);
    }
    @GetMapping("/user/refund/waiting")
    public List<Refund> getAllUserWaitingRefunds(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return refundService.getAllUserRefund(userId,RefundStatus.WAITING);
    }
    @GetMapping("/user/refund/cancel")
    public List<Refund> getAllUserCancelRefunds(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return refundService.getAllUserRefund(userId,RefundStatus.CANCEL);
    }
    @GetMapping("/user/refund/success")
    public List<Refund> getAllUserSuccessRefunds(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return refundService.getAllUserRefund(userId,RefundStatus.SUCCESS);
    }

    @PostMapping("/user/refund")
    public ResponseEntity<?> createRefund(@RequestBody RefundDTO refundDTO, @RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        UserOrder userOrder=userOrderService.getUserOrderById(refundDTO.getOrderId());
        if(userOrder.getOrderStatus()==OrderStatus.SUCCESS){
            Refund refund=new Refund();
            refund.setRefundStatus(RefundStatus.WAITING);
            refund.setUserOrder(userOrderService.getUserOrderById(refundDTO.getOrderId()));
            refund.setDescription(refundDTO.getDescription());
            refund.setOurUsers(userId);
            Refund savedRefund=refundService.saveRefund(refund);
            return new ResponseEntity<Refund>(savedRefund,HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/admin/cancel-refund/{id}")
    public ResponseEntity<String> cancelRefund(@PathVariable("id")long id){
        Refund refund=refundService.getRefundById(id);
        refund.setRefundStatus(RefundStatus.CANCEL);
        refundService.saveRefund(refund);
        return new ResponseEntity<String>("Refund Canceled Successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/user/cancel-refund/{id}")
    public ResponseEntity<String> deleteRefund(@PathVariable("id")long id){
        Refund refund=refundService.getRefundById(id);
        if(refund.getRefundStatus()==RefundStatus.WAITING){
            refundService.deleteRefund(id);
            return new ResponseEntity<String>("Refund Delete Successfully!", HttpStatus.OK);
        }
        return new ResponseEntity<String>("Refund Delete Fail!", HttpStatus.OK);
    }
}
