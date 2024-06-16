package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductDetailRepository extends JpaRepository<ProductDetail,Long> {

    @Query("SELECT p.color FROM ProductDetail as p")
    List<String> findAllColors();
    @Query("SELECT p.product_image FROM ProductDetail p WHERE p.product_detail_id=:detail")
    byte[] getImageById(@Param("detail") long detail);
}
