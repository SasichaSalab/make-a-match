package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.Favorite;
import com.makeAMatch.makeAMatch.model.MatchProduct;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.ProductSize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchProductRepository extends JpaRepository<MatchProduct,Long> {
    @Query("SELECT DISTINCT m FROM MatchProduct m WHERE m.user = :user")
    List<MatchProduct> getAllMatchProductList(@Param("user") OurUsers user);
    Page<MatchProduct> findByUser(OurUsers user, Pageable pageable);
}
