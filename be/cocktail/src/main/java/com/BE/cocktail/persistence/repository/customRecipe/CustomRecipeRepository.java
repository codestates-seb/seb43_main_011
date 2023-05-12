package com.BE.cocktail.persistence.repository.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomRecipeRepository extends JpaRepository<CustomRecipe, Long> {

//    CustomRecipe findByName(String name);
    List<CustomRecipe> findByDeletedFalse();

    @Query("SELECT c FROM CustomRecipe c WHERE (c.name LIKE %:keyword% OR c.ingredient LIKE %:keyword%)")
    Page<CustomRecipe> findAllByKeyword(String keyword, PageRequest pageRequest);
}
