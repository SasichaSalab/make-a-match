package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.ProductDetail;

import java.util.List;

public interface ProductDetailService {
    List<String> findAllColors();

    ProductDetail saveProductDetail(ProductDetail productDetail);

    List<ProductDetail> addProductDetail(ProductDetail productDetail,long productId);

    ProductDetail getProductDetailById(long id);

    void deleteProductDetail(long id);
    String getImageByDetailId(long id);
    String getColorByDetailId(long id);
}
