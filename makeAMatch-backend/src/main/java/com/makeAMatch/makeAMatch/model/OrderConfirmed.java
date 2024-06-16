package com.makeAMatch.makeAMatch.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_confirmed")
public class OrderConfirmed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long order_confirmed_id;
    @ManyToOne
    @JoinColumn(name = "user_order_id")
    private UserOrder userOrderConfirm;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUsers user;
}
