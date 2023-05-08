package com.BE.cocktail.customRecipe;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomRecipeRepository extends JpaRepository<CustomRecipe, Long> {
}
