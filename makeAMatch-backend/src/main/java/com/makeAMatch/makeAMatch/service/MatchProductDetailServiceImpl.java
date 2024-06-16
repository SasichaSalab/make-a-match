package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.MatchProductDetail;
import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductSize;
import com.makeAMatch.makeAMatch.repository.MatchProductDetailRepository;
import com.makeAMatch.makeAMatch.repository.ProductRepository;
import com.makeAMatch.makeAMatch.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MatchProductDetailServiceImpl implements MatchProductDetailService{

    @Autowired
    private MatchProductDetailRepository matchProductDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public MatchProductDetail saveMatchProductDetail(MatchProductDetail matchProductDetail) {
        return matchProductDetailRepository.save(matchProductDetail);
    }

    @Override
    public List<MatchProductDetail> getMatchProductDetailIdFormProductSizeId(Long id) {
        Product p=productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("find product size from favorites: "+id));
        return matchProductDetailRepository.getMatchProductDetailIdFromProductSizeId(p);
    }

    @Override
    public void deleteMatchProductDetail(Long id) {
        matchProductDetailRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Remove from favorites: "+id));
        matchProductDetailRepository.deleteById(id);
    }

}
