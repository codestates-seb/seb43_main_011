package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeGetResponseDto {
    private String name;

    private String ingredient;

    private String recipe;

    private String imageUrl;

    public static RegularRecipeGetResponseDto of(RegularRecipe regularRecipe) {

        return new RegularRecipeGetResponseDto(regularRecipe.getName(), regularRecipe.getIngredient(), regularRecipe.getRecipe(), regularRecipe.getImageUrl());
    }
}
