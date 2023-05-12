package com.BE.cocktail.persistence.repository.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomRecipeRepository extends JpaRepository<CustomRecipe, Long> {

//    CustomRecipe findByName(String name);
    List<CustomRecipe> findByDeletedFalse();
}
