package com.BE.cocktail.regularRecipe;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RegularRecipeRepository extends JpaRepository<RegularRecipe, Long> {

//    Optional<List<RegularRecipe>> findAllByName(String name);
    List<RegularRecipe> findAllByName(String name);

}
