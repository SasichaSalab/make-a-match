package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "user_order") // Change the table name to something different
@JsonIgnoreProperties({"user","orderConfirmed"})
public class UserOrder { // Changed the class name from Order to UserOrder

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId; // Changed the variable name from order_id to orderId

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus=OrderStatus.WAITING;

    @Column(nullable = false)
    private LocalDate orderDate;

    @OneToMany(mappedBy = "userOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserOrderDetail> details;

    @Lob
    @Column(name = "slip_image", columnDefinition = "LONGBLOB")
    private byte[] slip_image;

    @Column(nullable = false)
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUsers user;

    @Column(nullable = true)
    private LocalDate confirmationDate; // Changed the variable name from confirmation_date to confirmationDate

    @OneToMany(mappedBy = "userOrderConfirm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderConfirmed> orderConfirmed;

}
