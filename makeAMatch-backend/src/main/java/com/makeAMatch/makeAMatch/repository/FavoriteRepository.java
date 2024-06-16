package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("SELECT DISTINCT f FROM Favorite f WHERE f.user_id = :userId")
    List<Favorite> getAllFavoriteList(@Param("userId") OurUsers userId);

    @Query("SELECT f.favorite_id FROM Favorite f WHERE f.product = :product")
    List<Long> getFavoriteIdFromProductId(@Param("product") Product product);
}
