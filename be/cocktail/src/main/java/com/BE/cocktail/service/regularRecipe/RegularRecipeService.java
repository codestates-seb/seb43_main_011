package com.BE.cocktail.service.regularRecipe;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.regularRecipe.RegularRecipeGetResponseDto;

import com.BE.cocktail.dto.regularRecipe.RegularRecipeMultiResponseDto;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import com.BE.cocktail.persistence.repository.regularRecipe.RegularRecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RegularRecipeService {

    private final RegularRecipeRepository regularRecipeRepository;

    public RegularRecipeGetResponseDto find(Long id) {

        RegularRecipe regularRecipe = regularRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR400));

        return RegularRecipeGetResponseDto.of(regularRecipe);
    }
    @Transactional(readOnly = true)
    public RegularRecipeMultiResponseDto findAllRecipes() {
        List<RegularRecipe> regularRecipes = regularRecipeRepository.findAll();
        return RegularRecipeMultiResponseDto.of(regularRecipes);
    }

}
