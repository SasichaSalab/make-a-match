package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.dto.AmountDTO;
import com.makeAMatch.makeAMatch.dto.CountAdminDTO;
import com.makeAMatch.makeAMatch.dto.CountUserDTO;
import com.makeAMatch.makeAMatch.dto.DetailIdDTO;
import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @Autowired
    private ProductSizeService productSizeService;
    @Autowired
    private UserOrderService userOrderService;
    @Autowired
    private RefundService refundService;

    @PostMapping("/user/add-to-cart")
    public ResponseEntity<Cart> addToCart(@RequestBody DetailIdDTO detailIdDTO, @RequestHeader(value="Authorization") String authHeader){
        Cart cart = new Cart();
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);

        ProductSize productDetail=productSizeService.getProductSizeById(detailIdDTO.getDetailId());
        cart.setCartProductSize(productDetail);
        cart.setAmount(detailIdDTO.getAmount());
        cart.setUser(userId);
        Cart savedCart=cartService.addToCart(cart);
        return new ResponseEntity<Cart>(savedCart,HttpStatus.CREATED);
    }

    @PutMapping("/user/update-cart/{cartId}")
    public ResponseEntity<?> updateMatchProduct(@PathVariable("cartId") long cartId, @RequestBody AmountDTO amountDTO) {
        try {
            Cart cart=cartService.updateCart(amountDTO.getAmount(),cartId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found with id: " + cartId);
        }
    }

    @GetMapping("/user/get-product-size/{cartId}")
    public ResponseEntity<?> getProductSizeIdFromCartId(@PathVariable("cartId") long cartId) {
        try {
            long cart=cartService.getProductSizeIdFromCartId(cartId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found with id: " + cartId);
        }
    }
    @GetMapping("/user/product-size/{cartId}")
    public ResponseEntity<?> getProductSizeFromCartId(@PathVariable("cartId") long cartId) {
        try {
            ProductSize cart=cartService.getProductSizeFromCartId(cartId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found with id: " + cartId);
        }
    }

    @DeleteMapping("/user/cart/{id}")
    public ResponseEntity<String> deleteCart(@PathVariable("id")long id){
        cartService.deleteCart(id);
        return new ResponseEntity<String>("Remove product from cart Successfully!",HttpStatus.OK);
    }

    @GetMapping("user/cart")
    public List<Cart> getAllCarts(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return cartService.getAllCarts(userId);
    }
    @GetMapping("user/count")
    public CountUserDTO getTotalForUser(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        CountUserDTO c=new CountUserDTO();
        c.setCart(cartService.sumCart(userId));
        c.setWaiting_order(userOrderService.getSumOrder(userId,OrderStatus.WAITING));
        c.setSending_order(userOrderService.getSumOrder(userId,OrderStatus.SENDING));
        c.setSuccess_order(userOrderService.getSumOrder(userId,OrderStatus.SUCCESS));
        c.setCancel_order(userOrderService.getSumOrder(userId,OrderStatus.CANCEL));
        c.setWaiting_refund(refundService.getSumUserRefund(userId,RefundStatus.WAITING));
        c.setSuccess_refund(refundService.getSumUserRefund(userId,RefundStatus.SUCCESS));
        c.setCancel_refund(refundService.getSumUserRefund(userId,RefundStatus.CANCEL));
        return c;
    }
    @GetMapping("admin/count")
    public CountAdminDTO getTotalForAdmin(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        CountAdminDTO c=new CountAdminDTO();
        c.setOrder(userOrderService.getTotalOrdersForAdmin(OrderStatus.WAITING));
        c.setRefund(refundService.getSumAdminRefund(RefundStatus.WAITING));
        return c;
    }
}
