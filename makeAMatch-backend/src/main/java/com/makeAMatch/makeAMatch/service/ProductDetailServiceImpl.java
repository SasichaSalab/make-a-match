package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductDetail;
import com.makeAMatch.makeAMatch.repository.ProductDetailRepository;
import com.makeAMatch.makeAMatch.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class ProductDetailServiceImpl implements ProductDetailService{

    private final ProductDetailRepository productDetailRepository;
    private final ProductRepository productRepository;

    public ProductDetailServiceImpl(ProductDetailRepository productDetailRepository, ProductRepository productRepository) {
        this.productDetailRepository = productDetailRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<String> findAllColors() {
        return productDetailRepository.findAllColors();
    }

    @Override
    public ProductDetail saveProductDetail(ProductDetail productDetail) {
        return productDetailRepository.save(productDetail);
    }

    @Override
    public List<ProductDetail> addProductDetail(ProductDetail productDetail, long productId) {
        // Retrieve the existing product from the database
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        // Associate the product detail with the existing product
        productDetail.setProduct(existingProduct);

        // Save the product detail
        ProductDetail savedDetail = productDetailRepository.save(productDetail);

        // Add the saved detail to the list of details in the existing product
        existingProduct.getDetails().add(savedDetail);

        // Update and save the existing product with the new detail
        productRepository.save(existingProduct);

        // Return the list of details associated with the product
        return existingProduct.getDetails();
    }

    @Override
    public ProductDetail getProductDetailById(long id) {
        return productDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductDetail not found with id: " + id));
    }

    @Override
    public void deleteProductDetail(long id) {
        productDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductDetail not found with id: " + id));
        productDetailRepository.deleteById(id);
    }

    @Override
    public String getImageByDetailId(long id) {
            byte[] image = productDetailRepository.getImageById(id);
            System.out.println(id);
            return Base64.getEncoder().encodeToString(image);
    }

    @Override
    public String getColorByDetailId(long id) {
        ProductDetail p=productDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductDetail not found with id: " + id));
        return p.getColor();
    }


}
