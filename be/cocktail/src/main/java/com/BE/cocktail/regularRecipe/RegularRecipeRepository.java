package com.BE.cocktail.regularRecipe;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegularRecipeRepository extends JpaRepository<RegularRecipe, Long> {

    List<RegularRecipe> findAllByName(String name);

}
