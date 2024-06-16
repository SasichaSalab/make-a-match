package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.MatchProduct;
import com.makeAMatch.makeAMatch.model.OurUsers;
import org.springframework.stereotype.Service;

import java.util.List;

public interface MatchProductService {

    List<MatchProduct> getAllMatchProducts(OurUsers ourUsers);
    MatchProduct saveMatchProduct(MatchProduct matchProduct);
    MatchProduct updateMatchProduct(MatchProduct matchProduct, long id);
    void deleteMatchProduct(long id);
    MatchProduct getMatchProductById(long id);
}
