package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.io.ByteArrayInputStream;
import java.util.List;

@Data
@Entity
@Table(name = "product")
@JsonIgnoreProperties({"favorites","matchProductDetails"})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "productName",nullable = false,length = 50)
    private String productName;
    @Column(name = "productDescription",nullable = false)
    private String productDescription;
    @Column(name = "productPrice",nullable = false)
    private Double productPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductDetail> details;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tag tag;

    @Column(name = "sales",nullable = true)
    private int sales=0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "matchProductSize", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MatchProductDetail> matchProductDetails;
}
