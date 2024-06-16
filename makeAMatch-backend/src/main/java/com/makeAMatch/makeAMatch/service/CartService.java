package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Cart;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.ProductSize;

import java.util.List;

public interface CartService {
    Cart addToCart(Cart cart);
    List<Cart> getAllCarts(OurUsers ourUsers);
    Cart updateCart(int amount,long id);
    void deleteCart(long id);
    Cart getCartById(long id);

    Cart saveCart(Cart cart);
    Cart getCartIdFormProductSizeId(Long id);

    Long getProductSizeIdFromCartId(Long id);

    ProductSize getProductSizeFromCartId(Long id);

    Integer sumCart(OurUsers users);
}
