package com.BE.cocktail.customRecipe;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomRecipeRepository extends JpaRepository<CustomRecipe, Long> {

    CustomRecipe findByName(String name);
    List<CustomRecipe> findByStatusTrue();

}
