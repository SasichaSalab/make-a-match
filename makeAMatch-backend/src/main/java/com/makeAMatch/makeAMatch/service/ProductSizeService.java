package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.dto.ProductCardDTO;
import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductDetail;
import com.makeAMatch.makeAMatch.model.ProductSize;

import java.util.List;

public interface ProductSizeService {
    List<String> getAllSize();

    ProductSize saveProductSize(ProductSize productSize);

    List<ProductSize> addProductSize(ProductSize productSize, long productDetailId);
    void deleteSize(long id);

    ProductSize getProductSizeById(long id);
    Product getProductBySizeId(long id);

    long getDetailsIdBySize(long id);

    ProductDetail getDetailBySize(long id);

    ProductCardDTO getCardDataByProductSizeId(long id);
}
