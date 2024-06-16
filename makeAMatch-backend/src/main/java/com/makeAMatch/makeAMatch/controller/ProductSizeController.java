package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.dto.ProductCardDTO;
import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductSizeController {
    private final ProductDetailService productDetailService;
    private final ProductSizeService productSizeService;

    private final MatchProductDetailService matchProductDetailService;
    private final CartService cartService;


    public ProductSizeController(ProductDetailService productDetailService, ProductSizeService productSizeService, MatchProductService matchProductService, MatchProductDetailService matchProductDetailService, CartService cartService) {
        this.productDetailService = productDetailService;
        this.productSizeService = productSizeService;
        this.matchProductDetailService = matchProductDetailService;
        this.cartService = cartService;
    }

    @PostMapping("/admin/product_size/{productDetailId}/size")
    public ResponseEntity<?> addProductSize(@RequestBody ProductSize productSize, @PathVariable long productDetailId) {
        try {
            ProductDetail existingProduct=productDetailService.getProductDetailById(productDetailId);
            // Retrieve the existing product
            // Associate the product detail with the existing product
            productSize.setSizeProduct(existingProduct);

            // Save the product detail
            ProductSize savedProductSize=productSizeService.saveProductSize(productSize);

            // Associate and save product sizes

            // Add the saved product detail to the existing product
            existingProduct.getProductSizes().add(savedProductSize);
            productDetailService.saveProductDetail(existingProduct);

            return new ResponseEntity<ProductSize>(savedProductSize, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Detail not found with id: " + productDetailId);
        }
    }

    @DeleteMapping("/admin/product_size/{id}")
    public ResponseEntity<String> deleteSize(@PathVariable("id") long id) {
        // Retrieve the Favorite ID associated with the ProductSize ID

        // Find the Cart entity associated with the ProductSize ID
        Cart cart = cartService.getCartIdFormProductSizeId(id);

        // If a Cart exists, remove the association with ProductSize
        if (cart != null) {
            cart.setCartProductSize(null);
            cartService.saveCart(cart);
        }

        // Retrieve the list of MatchProductDetail entities associated with the ProductSize ID
        List<MatchProductDetail> matchProductDetails = matchProductDetailService.getMatchProductDetailIdFormProductSizeId(id);

        // Set the product_size_id field to null for each MatchProductDetail
        for (MatchProductDetail matchProductDetail : matchProductDetails) {
            matchProductDetail.setMatchProductSize(null);
            matchProductDetailService.saveMatchProductDetail(matchProductDetail);
        }

        // Delete the Favorite entity

        // Delete the ProductSize entity
        productSizeService.deleteSize(id);

        return new ResponseEntity<String>("Product Size Deleted Successfully!", HttpStatus.OK);
    }


    @GetMapping("/user/get-product/{id}")
    public Product getProductBySize(@PathVariable(name = "id") long id){
        return productSizeService.getProductBySizeId(id);
    }

    @GetMapping("/user/get-detailId/{id}")
    public long getDetailIdBySize(@PathVariable(name = "id") long id){
        return productSizeService.getDetailsIdBySize(id);
    }
    @GetMapping("/user/get-detail/{id}")
    public ProductDetail getDetailBySize(@PathVariable(name = "id") long id){
        return productSizeService.getDetailBySize(id);
    }

    @GetMapping("/user/get-card-data/{id}")
    public ProductCardDTO getProductCardData(@PathVariable(name = "id") long id){
        return productSizeService.getCardDataByProductSizeId(id);
    }
}
