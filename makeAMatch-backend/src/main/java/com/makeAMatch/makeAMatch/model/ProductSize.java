package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "product_size")
@JsonIgnoreProperties({"sizeProduct","productSize","matchProductDetails","carts"})
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long product_size_id;

    @Column(name = "quantity", nullable = false, length = 10) // Assuming a maximum length of 10 characters
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "product_detail_id")
    private ProductDetail sizeProduct;

    @OneToMany(mappedBy = "productSize", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserOrderDetail> productSize;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Size size;

    @OneToMany(mappedBy = "cartProductSize", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cart> carts;
}
