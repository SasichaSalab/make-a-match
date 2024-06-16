package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Favorite;
import com.makeAMatch.makeAMatch.model.OurUsers;
import com.makeAMatch.makeAMatch.model.Product;
import com.makeAMatch.makeAMatch.model.ProductSize;
import com.makeAMatch.makeAMatch.repository.FavoriteRepository;
import com.makeAMatch.makeAMatch.repository.ProductRepository;
import com.makeAMatch.makeAMatch.repository.ProductSizeRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService{

    private final FavoriteRepository favoriteRepository;
    private final ProductRepository productRepository;

    public FavoriteServiceImpl(FavoriteRepository favoriteRepository, ProductRepository productRepository) {
        this.favoriteRepository = favoriteRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Favorite> getAllFavoriteList(OurUsers user_id) {
        return favoriteRepository.getAllFavoriteList(user_id);
    }

    @Override
    public Favorite saveFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    @Override
    public void deleteFavorite(Long id) {
        favoriteRepository.findById(id)
                        .orElseThrow(()->new RuntimeException("Remove from favorites: "+id));
        favoriteRepository.deleteById(id);
    }

    @Override
    public List<Long> getFavoriteIdFormProductId(Long id) {
        Product p=productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("find product size from favorites: "+id));
        List<Long> f=favoriteRepository.getFavoriteIdFromProductId(p);
        return f;
    }

    @Override
    public boolean isFavorite(OurUsers user, long id) {
        List<Favorite> list=favoriteRepository.getAllFavoriteList(user);
        Product p=productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("find product size from favorites: "+id));
        for(Favorite f:list){
            if(p==f.getProduct()){
                return true;
            }
        }
        return false;
    }
}
