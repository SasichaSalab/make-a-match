package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductSizeRepository extends JpaRepository<ProductSize,Long> {

    @Query("SELECT DISTINCT p.size FROM ProductSize p")
    List<String> findAllSizes();
}
