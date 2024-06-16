package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cart")
@JsonIgnoreProperties({"user"})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cart_id;

    @ManyToOne
    @JoinColumn(name = "product_size_id")
    private ProductSize cartProductSize;

    @Column(nullable = false)
    private int amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUsers user;
}
