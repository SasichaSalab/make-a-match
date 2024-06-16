package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.exception.ResourceNotFoundException;
import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;


    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        super();
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts(String color, Size size) {

        return productRepository.findAllProducts(color,size);
    }

    @Override
    public List<Product> getAllByTag(Tag tag,String color,Size size) {
        return productRepository.findByTag(tag,color,size);
    }

    @Override
    public List<Product> searchProducts(String key) {
        return productRepository.searchProducts(key);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product updatedProduct,long id) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        // Update the properties of the existing product with the new values
        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setProductDescription(updatedProduct.getProductDescription());
        existingProduct.setProductPrice(updatedProduct.getProductPrice());
        existingProduct.setTag(updatedProduct.getTag());

        // Update details and sizes
        updateDetailsAndSizes(existingProduct, updatedProduct);

        // Save the updated product back to the database
        return productRepository.save(existingProduct);
    }

    @Override
    public Product getProductById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public int getSumOfProductsByTag(Tag tag) {
        return productRepository.sumOfTagProducts(tag);
    }

    @Override
    public int getSumOfAllProducts() {
        return productRepository.sumOfAllProducts();
    }

    @Override
    public void deleteProduct(long id) {
        productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        productRepository.deleteById(id);
    }


    private void updateDetailsAndSizes(Product existingProduct, Product updatedProduct) {
        // Update details
        List<ProductDetail> existingDetails = existingProduct.getDetails();
        List<ProductDetail> updatedDetails = updatedProduct.getDetails();

        for (int i = 0; i < Math.min(existingDetails.size(), updatedDetails.size()); i++) {
            ProductDetail existingDetail = existingDetails.get(i);
            ProductDetail updatedDetail = updatedDetails.get(i);

            existingDetail.setColor(updatedDetail.getColor());
            existingDetail.setProduct_image(updatedDetail.getProduct_image());

            // Update sizes
            List<ProductSize> existingSizes = existingDetail.getProductSizes();
            List<ProductSize> updatedSizes = updatedDetail.getProductSizes();

            for (int j = 0; j < Math.min(existingSizes.size(), updatedSizes.size()); j++) {
                ProductSize existingSize = existingSizes.get(j);
                ProductSize updatedSize = updatedSizes.get(j);

                existingSize.setSize(updatedSize.getSize());
                existingSize.setQuantity(updatedSize.getQuantity());
            }
        }
    }

}
