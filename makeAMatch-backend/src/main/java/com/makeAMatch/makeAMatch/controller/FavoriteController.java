package com.makeAMatch.makeAMatch.controller;

import com.makeAMatch.makeAMatch.model.*;
import com.makeAMatch.makeAMatch.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private OurUserDetailsService ourUserDetailsService;
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private ProductService productService;

    @GetMapping("/user/favorite")
    public List<Favorite> getAllFavorites(@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
            return Collections.emptyList();
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        // Now you have the user ID, you can use it to retrieve favorites
        return favoriteService.getAllFavoriteList(userId);
    }

    @PostMapping("/user/favorite/{id}")
    public ResponseEntity<Favorite> createFavorite(@PathVariable(name = "id")long id,@RequestHeader(value="Authorization") String authHeader){
        Favorite favorite=new Favorite();
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        favorite.setUser_id(userId);
        favorite.setProduct(productService.getProductById(id));
        Favorite savedFavorite= favoriteService.saveFavorite(favorite);
        return new ResponseEntity<Favorite>(savedFavorite, HttpStatus.CREATED);
    }

    @DeleteMapping("/user/favorite/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable("id")long id){
        favoriteService.deleteFavorite(id);
        return new ResponseEntity<String>("Favorite Delete Successfully!",HttpStatus.OK);
    }

    @GetMapping("/user/isFavorite/{id}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable("id")long id,@RequestHeader(value="Authorization") String authHeader){
        final String jwtToken;
        final String userEmail;
        if (authHeader == null || authHeader.isBlank()) {
            System.out.println("authHeader == null");
        }
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        OurUsers userId = (OurUsers) ourUserDetailsService.loadUserByUsername(userEmail);
        boolean bool=favoriteService.isFavorite(userId,id);
        return new ResponseEntity<Boolean>(bool,HttpStatus.OK);
    }

    @GetMapping("/user/favorite/product_size/{id}")
    public ResponseEntity<List<Long>> getFavoriteIdFromProductSize(@PathVariable("id")long id){
        List<Long> fav=favoriteService.getFavoriteIdFormProductId(id);
        return new ResponseEntity<List<Long>>(fav,HttpStatus.OK);
    }
}
