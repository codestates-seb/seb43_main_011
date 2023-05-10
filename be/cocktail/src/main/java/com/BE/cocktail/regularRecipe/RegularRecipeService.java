package com.BE.cocktail.regularRecipe;

import com.BE.cocktail.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.regularRecipe.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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

        regularRecipeRepository.saveAll(regularRecipeList);

        return RegularRecipeCreateResponseDto.of(regularRecipeList);
    }
    @Transactional(readOnly = true)
    public RegularRecipeMultiResponseDto findAllRecipes() {
        List<RegularRecipe> regularRecipes = regularRecipeRepository.findAll();
        return RegularRecipeMultiResponseDto.of(regularRecipes);
    }
}
