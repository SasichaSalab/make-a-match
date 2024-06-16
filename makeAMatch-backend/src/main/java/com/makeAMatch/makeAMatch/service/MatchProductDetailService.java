package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.MatchProductDetail;

import java.util.List;

public interface MatchProductDetailService {
    MatchProductDetail saveMatchProductDetail(MatchProductDetail matchProductDetail);
    List<MatchProductDetail> getMatchProductDetailIdFormProductSizeId(Long id);
    void deleteMatchProductDetail(Long id);
}
