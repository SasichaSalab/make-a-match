package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.dto.UserOrderDTO;
import com.makeAMatch.makeAMatch.dto.UserOrderDetailDTO;
import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserOrderController {
    @Autowired
    private UserOrderService userOrderService;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @Autowired
    private ProductDetailService productDetailService;

    @Autowired
    private UserOrderDetailService userOrderDetailService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductSizeService productSizeService;

    @Autowired
    private OrderConfirmService orderConfirmService;

    @Autowired
    private CartService cartService;

    @Transactional
    @PostMapping("/user/createOrder")
    public ResponseEntity<UserOrder> createOrder(@RequestBody UserOrderDTO userOrderDTO, @RequestHeader(value="Authorization") String authHeader){
        UserOrder userOrder=new UserOrder();
        double total=0;
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        userOrder.setOrderStatus(OrderStatus.WAITING);
        userOrder.setOrderDate(LocalDate.now());
        userOrder.setSlip_image(userOrderDTO.getSlip_image());
        userOrder.setUser(userId);
        List<UserOrderDetail> listDetail=new ArrayList<>();
        for (UserOrderDetailDTO userOrderDetailDTO:userOrderDTO.getDetails()){
            ProductSize productSize=productSizeService.getProductSizeById(userOrderDetailDTO.getProductSizeId());
            ProductDetail productDetail=productDetailService.getProductDetailById(productSize.getSizeProduct().getProduct_detail_id());
            UserOrderDetail userOrderDetail=new UserOrderDetail();
            userOrderDetail.setUserOrder(userOrder);
            userOrderDetail.setProductSize(productSize);
            userOrderDetail.setQuantity(userOrderDetailDTO.getQuantity());
            UserOrderDetail savedDetail=userOrderDetailService.saveUserOrder(userOrderDetail);

            Product product=productService.getProductById(productDetail.getProduct().getId());
            product.setSales(product.getSales()+userOrderDetailDTO.getQuantity());
            productService.saveProduct(product);
            double price=product.getProductPrice();
            total=total+(price*userOrderDetailDTO.getQuantity());
            listDetail.add(savedDetail);
        }
        userOrder.setDetails(listDetail);
        userOrder.setTotalPrice(total);
        UserOrder savedUserOrder=userOrderService.saveOrder(userOrder);
        return new ResponseEntity<UserOrder>(savedUserOrder, HttpStatus.CREATED);
    }

    @GetMapping("/user/getAllWaitingOrder")
    public List<UserOrder> getAllWaitingOrders(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return userOrderService.getAllOrders(userId,OrderStatus.WAITING);
    }

    @GetMapping("/admin/getAllWaitingOrder")
    public List<UserOrder> getAllWaitingOrdersForAdmin(){
        return userOrderService.getAllOrdersForAdmin();
    }

    @GetMapping("/admin/getAllConfirmOrder")
    public List<UserOrder> getAllConfirmOrdersForAdmin(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        long adminId=userId.getId();
        return userOrderService.getAllConfirmedOrdersByUserAdminId(adminId);
    }
    @GetMapping("/admin/getAllCancelOrder")
    public List<UserOrder> getAllCancelOrdersForAdmin(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        long adminId=userId.getId();
        return userOrderService.getAllCancelOrdersByUserAdminId(adminId);
    }

    @GetMapping("/user/getAllCancelOrder")
    public List<UserOrder> getAllCancelOrders(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return userOrderService.getAllOrders(userId,OrderStatus.CANCEL);
    }

    @GetMapping("/user/getAllSendingOrder")
    public List<UserOrder> getAllSendingOrders(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return userOrderService.getAllOrders(userId,OrderStatus.SENDING);
    }

    @GetMapping("/user/getAllSuccessOrder")
    public List<UserOrder> getAllSuccessOrders(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return userOrderService.getAllOrders(userId,OrderStatus.SUCCESS);
    }
    @PutMapping("/admin/cancel_order/{id}")
    public ResponseEntity<String> cancelOrder(@RequestHeader(value="Authorization") String authHeader,@PathVariable("id")long id){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        UserOrder userOrder=userOrderService.getUserOrderById(id);
        if(userOrder.getOrderStatus()==OrderStatus.WAITING){
            for(UserOrderDetail userOrderDetail:userOrder.getDetails()){
                Product p=productSizeService.getProductBySizeId(userOrderDetail.getProductSize().getProduct_size_id());
                p.setSales(p.getSales()-userOrderDetail.getQuantity());
                productService.saveProduct(p);
            }
            userOrderService.AdminCancel(id,userId);
            return new ResponseEntity<String>("Order Canceled Successfully!",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Order Canceled Fail!",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/user/order/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable("id")long id){
        UserOrder userOrder=userOrderService.getUserOrderById(id);
        if(userOrder.getOrderStatus()==OrderStatus.WAITING){
            for(UserOrderDetail userOrderDetail:userOrder.getDetails()){
                userOrderDetailService.deleteOrderDetail(userOrderDetail.getUser_order_detail_id());
                Product p=productSizeService.getProductBySizeId(userOrderDetail.getProductSize().getProduct_size_id());
                p.setSales(p.getSales()-userOrderDetail.getQuantity());
                productService.saveProduct(p);
            }
            userOrderService.deleteOrder(id);
            return new ResponseEntity<String>("Order Delete Successfully!",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Order Delete Fail!",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/user/confirm/{id}")
    public ResponseEntity<String> userConfirm(@PathVariable("id")long id){
        UserOrder userOrder=userOrderService.getUserOrderById(id);
        userOrder.setConfirmationDate(LocalDate.now());
        userOrderService.saveOrder(userOrder);
        userOrderService.UserConfirmOrder(id);
        return new ResponseEntity<String>("Confirm Order Successfully!",HttpStatus.OK);
    }

    @PutMapping("/admin/confirm/{id}")
    public OrderConfirmed adminConfirm(@RequestHeader(value="Authorization") String authHeader,@PathVariable("id")long id){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        UserOrder userOrder=userOrderService.getUserOrderById(id);
        return userOrderService.AdminConfirm(id,userId);
    }

    @PostMapping(value = "/user/uploadSlipImage/{id}")
    public ResponseEntity<String> fileUploading(@RequestParam("file") MultipartFile file, @PathVariable("id") long orderId) {
        UserOrder u=userOrderService.getUserOrderById(orderId);
        try {
            byte[] imageData = file.getBytes();
            u.setSlip_image(imageData);
            userOrderService.saveOrder(u);
        } catch (IOException e) {
            // Handle the exception
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Successfully uploaded the file");
    }

    @GetMapping("/user/getOrderData/{id}")
    public List<Long> getOrderData(@PathVariable("id") long orderId){
        List<Long> p=userOrderDetailService.getProductSizeIdByOrderId(orderId);
        return p;
    }
}
