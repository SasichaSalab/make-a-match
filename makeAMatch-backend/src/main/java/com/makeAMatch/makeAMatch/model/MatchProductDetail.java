package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "match_product_detail")
@JsonIgnoreProperties({"matchProduct"})
public class MatchProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long match_product_detail_id;
    @ManyToOne
    @JoinColumn(name = "match_product_id")
    private MatchProduct matchProduct;

    @ManyToOne
    @JoinColumn(name = "product_size_id")
    private Product matchProductSize;
}
