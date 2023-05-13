package com.BE.cocktail.persistence.repository.regularRecipe;


import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RegularRecipeRepository extends JpaRepository<RegularRecipe, Long> {

    List<RegularRecipe> findAllByName(String name);

    @Query("SELECT r FROM RegularRecipe r WHERE r.alcVol >= :startRange AND r.alcVol <= :endRange")
    Page<RegularRecipe> findAllByAlcVolRange(int startRange, int endRange, Pageable pageable);

}