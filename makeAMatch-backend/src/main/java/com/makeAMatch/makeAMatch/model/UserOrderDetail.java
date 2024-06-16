package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_order_detail")
@JsonIgnoreProperties("userOrder")
public class UserOrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_order_detail_id;
    @ManyToOne
    @JoinColumn(name = "user_order_id")
    private UserOrder userOrder;
    @ManyToOne
    @JoinColumn(name = "product_size_id")
    private ProductSize productSize;
    @Column(nullable = false)
    private int quantity;
}
