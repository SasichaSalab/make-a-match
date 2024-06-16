package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "refund")
@JsonIgnoreProperties({"ourUsers"})
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long refund_id;
    @OneToOne
    @JoinColumn(name = "user_order_id")
    private UserOrder userOrder;
    private String description;
    @Enumerated(EnumType.STRING)
    private RefundStatus refundStatus;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUsers ourUsers;
}
