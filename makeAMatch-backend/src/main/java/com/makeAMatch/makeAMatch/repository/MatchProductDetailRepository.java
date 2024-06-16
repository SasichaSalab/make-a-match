package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.MatchProductDetail;
import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchProductDetailRepository extends JpaRepository<MatchProductDetail,Long> {
    @Query("SELECT m.match_product_detail_id FROM MatchProductDetail m WHERE m.matchProductSize = :p")
    List<MatchProductDetail> getMatchProductDetailIdFromProductSizeId(@Param("p") Product product);
}
