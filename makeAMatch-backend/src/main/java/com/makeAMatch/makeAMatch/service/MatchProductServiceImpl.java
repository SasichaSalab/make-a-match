package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.repository.MatchProductDetailRepository;
import com.makeAMatch.makeAMatch.repository.MatchProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchProductServiceImpl implements MatchProductService{

    @Autowired
    private MatchProductRepository matchProductRepository;
    @Autowired
    private MatchProductDetailRepository matchProductDetailRepository;

    @Override
    public List<MatchProduct> getAllMatchProducts(OurUsers ourUsers) {
        return matchProductRepository.getAllMatchProductList(ourUsers);
    }

    @Override
    public MatchProduct saveMatchProduct(MatchProduct matchProduct) {
        return matchProductRepository.save(matchProduct);
    }

    @Override
    public MatchProduct updateMatchProduct(MatchProduct matchProduct, long id) {
        MatchProduct matchProductOld=matchProductRepository.findById(id).orElseThrow(()->new RuntimeException("Match Product Not Found id:"+id));
        matchProductOld.setName(matchProduct.getName());
        matchProductOld.setDescription(matchProduct.getDescription());
        updateMatchProductDetail(matchProductOld,matchProduct);
        return matchProductRepository.save(matchProductOld);
    }

    private void updateMatchProductDetail(MatchProduct existingMatchProduct,MatchProduct updatedMatchProduct){
        List<MatchProductDetail> existingDetails=existingMatchProduct.getDetails();
        List<MatchProductDetail> updatedDetails=updatedMatchProduct.getDetails();
        for (int i = 0; i < Math.min(existingDetails.size(), updatedDetails.size()); i++) {
            MatchProductDetail existingDetail = existingDetails.get(i);
            MatchProductDetail updatedDetail = updatedDetails.get(i);

            existingDetail.setMatchProductSize(updatedDetail.getMatchProductSize());
        }
    }

    @Override
    public void deleteMatchProduct(long id) {
        matchProductRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match Product not found with id: " + id));
        matchProductRepository.deleteById(id);
    }

    @Override
    public MatchProduct getMatchProductById(long id) {
        return matchProductRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Match Product not found with id: " + id));
    }
}
