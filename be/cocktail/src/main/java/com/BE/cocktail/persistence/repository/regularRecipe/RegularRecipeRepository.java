package com.BE.cocktail.persistence.repository.regularRecipe;


import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegularRecipeRepository extends JpaRepository<RegularRecipe, Long> {

    List<RegularRecipe> findAllByName(String name);

    Page<RegularRecipe> findAllByAlcVol(Integer alcVol);

}
