package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.io.ByteArrayInputStream;
import java.sql.Blob;
import java.util.List;

@Data
@Entity
@Table(name = "product_detail")
@JsonIgnoreProperties({"product","favorites"})
public class ProductDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long product_detail_id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;


    @Column(name = "color", nullable = false, length = 30)
    private String color;

    @OneToMany(mappedBy = "sizeProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductSize> productSizes;

    @Lob
    @Column(name = "product_image", columnDefinition = "LONGBLOB")
    private byte[] product_image;

}
