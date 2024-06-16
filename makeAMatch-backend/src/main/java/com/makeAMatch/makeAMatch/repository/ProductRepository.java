package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.Size;
import com.makeAMatch.makeAMatch.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> , CrudRepository<Product, Long> {

    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN p.details pd " +
            "LEFT JOIN pd.productSizes ps " +
            "WHERE (:color IS NULL OR pd.color = :color) " +
            "AND (:size IS NULL OR ps.size = :size) " +
            "AND (:tagValue IS NULL OR p.tag = :tagValue)")
    List<Product> findByTag(@Param("tagValue") Tag tag, @Param("color") String color, @Param("size") Size size);

    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN p.details pd " +
            "LEFT JOIN pd.productSizes ps " +
            "WHERE (:color IS NULL OR pd.color = :color) " +
            "AND (:size IS NULL OR ps.size = :size)")
    List<Product> findAllProducts(@Param("color") String color, @Param("size") Size size);

    @Query("SELECT DISTINCT p FROM Product p " +
            "LEFT JOIN p.details pd " +
            "WHERE p.productName LIKE CONCAT('%', :key, '%') OR p.productDescription LIKE CONCAT('%', :key, '%') OR pd.color LIKE CONCAT('%', :key, '%')")
    List<Product> searchProducts(@Param("key")String key);

    @Query("SELECT SUM(p.sales) FROM Product p WHERE p.tag=:tag")
    int sumOfTagProducts(@Param("tag")Tag tag);

    @Query("SELECT SUM(p.sales) FROM Product p")
    int sumOfAllProducts();
}