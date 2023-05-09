package com.BE.cocktail.regularRecipe;

import com.BE.cocktail.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.regularRecipe.dto.RegularRecipeCreateDto;
import com.BE.cocktail.regularRecipe.dto.RegularRecipeCreateResponseDto;
import com.BE.cocktail.regularRecipe.dto.RegularRecipeSingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class RegularRecipeService {

    private final RegularRecipeRepository regularRecipeRepository;

    @Transactional(readOnly = true)
    public RegularRecipeSingleResponseDto findRecipe(String name) {

        List<RegularRecipe> regularRecipes = regularRecipeRepository.findAllByName(name);

        if(regularRecipes.isEmpty()) {
                throw new CocktailException(CocktailRtnConsts.ERR400);
        }

        return RegularRecipeSingleResponseDto.of(regularRecipes);
    }

    @Transactional
    public RegularRecipeCreateResponseDto saveRegularRecipe(RegularRecipeCreateDto createdto) {

        List<RegularRecipe> regularRecipeList = RegularRecipe.listOf(createdto);

        for (RegularRecipe regularRecipe:regularRecipeList) {
            regularRecipeRepository.save(regularRecipe);
        }

        return RegularRecipeCreateResponseDto.of(regularRecipeList);

    }

}
