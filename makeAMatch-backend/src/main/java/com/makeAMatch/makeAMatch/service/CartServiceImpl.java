package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Cart;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.ProductSize;
import com.makeAMatch.makeAMatch.repository.CartRepository;
import com.makeAMatch.makeAMatch.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Override
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getAllCarts(OurUsers ourUsers) {
        return cartRepository.getAllCartList(ourUsers);
    }

    @Override
    public Cart updateCart(int amount, long id) {
        Cart cart=cartRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found with id: " + id));
        cart.setAmount(amount);
        return cartRepository.save(cart);
    }

    @Override
    public void deleteCart(long id) {
        Cart cart=cartRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found with id: " + id));
        cartRepository.deleteById(id);
    }

    @Override
    public Cart getCartById(long id) {
        return cartRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartIdFormProductSizeId(Long id) {
        ProductSize p=productSizeRepository.findById(id)
                .orElseThrow(()->new RuntimeException("find product size from favorites: "+id));
        return cartRepository.getCartIdFromProductSizeId(p);
    }

    @Override
    public Long getProductSizeIdFromCartId(Long id) {
        ProductSize productSize=cartRepository.getProductSizeIdFromCartId(id);
        return productSize.getProduct_size_id();
    }

    @Override
    public ProductSize getProductSizeFromCartId(Long id) {
        ProductSize productSize=cartRepository.getProductSizeIdFromCartId(id);
        return productSize;
    }

    @Override
    public Integer sumCart(OurUsers users) {
        return cartRepository.getTotalCartForUser(users);
    }
}
