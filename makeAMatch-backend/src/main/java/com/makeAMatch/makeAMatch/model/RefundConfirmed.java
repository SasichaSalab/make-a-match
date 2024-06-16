package com.makeAMatch.makeAMatch.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "refund_confirmed")
public class RefundConfirmed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long refund_confirmed_id;

    @OneToOne
    @JoinColumn(name = "refund_id")
    private Refund refund;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private OurUsers user;
}
