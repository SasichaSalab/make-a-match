package com.makeAMatch.makeAMatch.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "match_product")
@JsonIgnoreProperties({"user"})
public class MatchProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long match_product_id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private OurUsers user;

    @OneToMany(mappedBy = "matchProduct", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MatchProductDetail> details;
}
