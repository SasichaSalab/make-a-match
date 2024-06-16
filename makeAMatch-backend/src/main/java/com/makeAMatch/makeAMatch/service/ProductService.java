package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.Size;
import com.makeAMatch.makeAMatch.model.Tag;

import java.util.List;

public interface ProductService{
    List<Product> getAllProducts(String color, Size size);
    List<Product> getAllByTag(Tag tag,String color,Size size);

    List<Product> searchProducts(String key);

    Product saveProduct(Product product);

    Product updateProduct(Product product,long id);

    Product getProductById(long id);

    void deleteProduct(long id);

    int getSumOfProductsByTag(Tag tag);

    int getSumOfAllProducts();


}
