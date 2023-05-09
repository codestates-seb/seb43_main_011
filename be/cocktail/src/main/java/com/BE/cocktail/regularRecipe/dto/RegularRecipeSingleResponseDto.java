package com.BE.cocktail.regularRecipe.dto;

import com.BE.cocktail.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeSingleResponseDto {

    private SingleResponse response;

    public static RegularRecipeSingleResponseDto of(List<RegularRecipe> regularRecipes) {
        RegularRecipeSingleResponseDto response = new RegularRecipeSingleResponseDto(SingleResponse.of(regularRecipes));

        return response;
    }
}
