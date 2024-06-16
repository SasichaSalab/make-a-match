package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.dto.ProductCardDTO;
import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductDetail;
import com.makeAMatch.makeAMatch.model.ProductSize;
import com.makeAMatch.makeAMatch.repository.ProductDetailRepository;
import com.makeAMatch.makeAMatch.repository.ProductRepository;
import com.makeAMatch.makeAMatch.repository.ProductSizeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSizeServiceImpl implements ProductSizeService{

    private final ProductSizeRepository productSizeRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ProductRepository productRepository;

    public ProductSizeServiceImpl(ProductSizeRepository productSizeRepository, ProductDetailRepository productDetailRepository, ProductRepository productRepository) {
        this.productSizeRepository = productSizeRepository;
        this.productDetailRepository = productDetailRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<String> getAllSize() {
        return productSizeRepository.findAllSizes();
    }

    @Override
    public ProductSize saveProductSize(ProductSize productSize) {
        return productSizeRepository.save(productSize);
    }

    @Override
    public List<ProductSize> addProductSize(ProductSize productSize, long productDetailId) {
        ProductDetail existingProduct = productDetailRepository.findById(productDetailId)
                .orElseThrow(() -> new RuntimeException("Product Detail not found with id: " + productDetailId));

        // Associate the product detail with the existing product
        productSize.setSizeProduct(existingProduct);
        ProductSize savedProductSize=productSizeRepository.save(productSize);

        // Add the saved detail to the list of details in the existing product
        existingProduct.getProductSizes().add(savedProductSize);

        // Update and save the existing product with the new detail
        productDetailRepository.save(existingProduct);

        // Return the list of details associated with the product
        return existingProduct.getProductSizes();
    }

    @Override
    public void deleteSize(long id) {
        productSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Size not found with id: " + id));
        productSizeRepository.deleteById(id);
    }

    @Override
    public ProductSize getProductSizeById(long id) {
        return productSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Size not found with id: " + id));
    }

    @Override
    public Product getProductBySizeId(long id) {
        ProductSize productSize=productSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Size not found with id: " + id));
        return productRepository.findById(productSize.getSizeProduct().getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public long getDetailsIdBySize(long id) {
        ProductSize productSize=productSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Size not found with id: " + id));

        return productSize.getSizeProduct().getProduct_detail_id();
    }

    @Override
    public ProductDetail getDetailBySize(long id) {
        ProductSize p=productSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Size not found with id: " + id));
        return p.getSizeProduct();
    }

    @Override
    public ProductCardDTO getCardDataByProductSizeId(long id) {
        ProductSize p=productSizeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Size not found with id: " + id));
        ProductDetail d=productDetailRepository.findById(p.getSizeProduct().getProduct_detail_id())
                .orElseThrow(() -> new RuntimeException("Product Detail not found with id: " + id));
        Product product=productRepository.findById(d.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        ProductCardDTO productCardDTO=new ProductCardDTO();
        productCardDTO.setColor(d.getColor());
        productCardDTO.setName(product.getProductName());
        productCardDTO.setImage(d.getProduct_image());
        productCardDTO.setPrice(product.getProductPrice());
        productCardDTO.setDescription(product.getProductDescription());
        return productCardDTO;
    }

}
