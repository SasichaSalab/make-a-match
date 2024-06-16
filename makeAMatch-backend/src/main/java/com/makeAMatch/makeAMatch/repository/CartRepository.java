package com.makeAMatch.makeAMatch.repository;

import com.makeAMatch.makeAMatch.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query("SELECT DISTINCT c FROM Cart c WHERE c.user = :user")
    List<Cart> getAllCartList(@Param("user") OurUsers user);
    @Query("SELECT COUNT(c.cart_id) FROM Cart c WHERE c.user = :user")
    Integer getTotalCartForUser(@Param("user") OurUsers user);
    @Query("SELECT c.cart_id FROM Cart c WHERE c.cartProductSize = :size")
    Cart getCartIdFromProductSizeId(@Param("size") ProductSize productSize);

    @Query("SELECT c.cartProductSize FROM Cart c WHERE c.cart_id = :cart_id")
    ProductSize getProductSizeIdFromCartId(@Param("cart_id") long cart_id);
}
