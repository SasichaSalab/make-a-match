package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.dto.ProductDetailDTO;
import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductDetail;
import com.makeAMatch.makeAMatch.model.ProductSize;
import com.makeAMatch.makeAMatch.service.ProductDetailService;
import com.makeAMatch.makeAMatch.service.ProductService;
import com.makeAMatch.makeAMatch.service.ProductSizeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class ProductDetailController {
    private final ProductService productService;
    private final ProductDetailService productDetailService;
    private final ProductSizeService productSizeService;

    public ProductDetailController(ProductService productService, ProductDetailService productDetailService, ProductSizeService productSizeService) {
        this.productService = productService;
        this.productDetailService = productDetailService;

        this.productSizeService = productSizeService;
    }

    @PostMapping("/admin/product_detail/{productId}/details")
    public ResponseEntity<?> addProductDetail(@RequestBody ProductDetailDTO productDetailDTO, @PathVariable long productId) {
        try {
            // Retrieve the existing product
            Product existingProduct = productService.getProductById(productId);
            ProductDetail d=new ProductDetail();
            // Associate the product detail with the existing product
            d.setProduct(existingProduct);
            d.setProductSizes(productDetailDTO.getProductSizes());
            d.setColor(productDetailDTO.getColor());
            // Save the product detail
            ProductDetail savedProductDetail = productDetailService.saveProductDetail(d);

            // Associate and save product sizes
            for (ProductSize size : productDetailDTO.getProductSizes()) {
                size.setSizeProduct(savedProductDetail);
                productSizeService.saveProductSize(size);
            }

            // Add the saved product detail to the existing product
            existingProduct.getDetails().add(savedProductDetail);
            productService.saveProduct(existingProduct);

            return new ResponseEntity<ProductDetail>(savedProductDetail, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with id: " + productId);
        }
    }

    @DeleteMapping("/admin/product_detail/{id}")
    public ResponseEntity<String> deleteProductDetail(@PathVariable("id") long id){
        productDetailService.deleteProductDetail(id);
        return new ResponseEntity<String>("Product Detail Delete Successfully!",HttpStatus.OK);
    }

    @PostMapping(value = "/admin/uploadImage/{id}")
    public ResponseEntity<String> fileUploading(@RequestParam("file") MultipartFile file, @PathVariable("id") long detailId) {
        ProductDetail p = productDetailService.getProductDetailById(detailId);
        try {
            byte[] imageData = file.getBytes();
            p.setProduct_image(imageData);
            productDetailService.saveProductDetail(p);
        } catch (IOException e) {
            // Handle the exception
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok("Successfully uploaded the file");
    }

    @GetMapping("/user/product-image/{detail}")
    public ResponseEntity<String> getProductImage(@PathVariable("detail") long detail) {
        String image = productDetailService.getImageByDetailId(detail);
        return ResponseEntity.ok(image);
    }

    @GetMapping("/user/product-color/{detail}")
    public ResponseEntity<String> getProductColor(@PathVariable("detail") long detail) {
        String color = productDetailService.getColorByDetailId(detail);
        return ResponseEntity.ok(color);
    }
}
