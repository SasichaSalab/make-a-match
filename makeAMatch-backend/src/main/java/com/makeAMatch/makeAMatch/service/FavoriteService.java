package com.makeAMatch.makeAMatch.service;

import com.makeAMatch.makeAMatch.model.Favorite;
import com.makeAMatch.makeAMatch.model.OurUsers;

import java.util.List;

public interface FavoriteService {
    List<Favorite> getAllFavoriteList(OurUsers id);
    Favorite saveFavorite(Favorite favorite);
    void deleteFavorite(Long id);

    List<Long> getFavoriteIdFormProductId(Long id);
    boolean isFavorite(OurUsers user,long id);
}
