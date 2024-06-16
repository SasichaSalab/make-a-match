package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.dto.MatchDTO;
import com.makeAMatch.makeAMatch.dto.MatchDetailDTO;
import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.repository.MatchProductRepository;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MatchProductController {
    @Autowired
    private MatchProductService matchProductService;
    @Autowired
    private MatchProductDetailService matchProductDetailService;
    @Autowired
    private OurUserDetailsService ourUserDetailsService;
    @Autowired
    private ProductService productService;
    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping("/user/match")
    public ResponseEntity<List<MatchProduct>> getAllMatchProducts(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        return new ResponseEntity<List<MatchProduct>>(matchProductService.getAllMatchProducts(userId),HttpStatus.CREATED);
    }

    @GetMapping("/user/match/{id}")
    public ResponseEntity<MatchProduct> getMatchProductById(@PathVariable long id){
        return new ResponseEntity<MatchProduct>(matchProductService.getMatchProductById(id),HttpStatus.OK);
    }

    @PostMapping("/user/createMatch")
    public ResponseEntity<MatchProduct> createMatch(@RequestBody MatchDTO matchDTO, @RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        MatchProduct matchProduct=new MatchProduct();
        matchProduct.setDescription(matchDTO.getDescription());
        matchProduct.setName(matchDTO.getName());
        matchProduct.setUser(userId);
        MatchProduct saveMatch=matchProductService.saveMatchProduct(matchProduct);
        return new ResponseEntity<MatchProduct>(saveMatch,HttpStatus.CREATED);
    }
    @PostMapping("/user/addMatchDetail")
    public ResponseEntity<String> addMatchDetail(@RequestBody MatchDetailDTO matchDetailDTO){
        MatchProduct matchProduct=matchProductService.getMatchProductById(matchDetailDTO.getMatchProductId());
        MatchProductDetail matchProductDetail=new MatchProductDetail();
        matchProductDetail.setMatchProduct(matchProduct);
        Product p=productService.getProductById(matchDetailDTO.getProductId());
        matchProductDetail.setMatchProductSize(p);
        MatchProductDetail saveMatch=matchProductDetailService.saveMatchProductDetail(matchProductDetail);
        return new ResponseEntity<String>("match detail added",HttpStatus.CREATED);
    }

    @PutMapping("/user/updateMatch/{matchId}")
    public ResponseEntity<?> updateMatchProduct(@PathVariable("matchId") long matchId, @RequestBody MatchDTO updateMatchProduct) {
        try {
            MatchProduct matchProduct=matchProductService.getMatchProductById(matchId);
            matchProduct.setName(updateMatchProduct.getName());
            matchProduct.setDescription(updateMatchProduct.getDescription());
            matchProductService.saveMatchProduct(matchProduct);
            return ResponseEntity.ok(matchProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Match Product not found with id: " + matchId);
        }
    }

    @DeleteMapping("/user/match/{id}")
    public ResponseEntity<String> deleteMatchProduct(@PathVariable("id")long id){
        MatchProduct m=matchProductService.getMatchProductById(id);
        for(MatchProductDetail d:m.getDetails()){
            matchProductDetailService.deleteMatchProductDetail(d.getMatch_product_detail_id());
        }
        matchProductService.deleteMatchProduct(id);
        return new ResponseEntity<String>("Match Product Delete Successfully!",HttpStatus.OK);
    }

    @DeleteMapping("/user/matchDetail/{id}")
    public ResponseEntity<String> deleteMatchProductDetail(@PathVariable("id")long id){
        matchProductDetailService.deleteMatchProductDetail(id);
        return new ResponseEntity<String>("Match Product Detail Delete Successfully!",HttpStatus.OK);
    }
}
