package com.BE.cocktail.dto.customRecipe;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomRecipeIdResponseDto {

    private Long recipeId;

    public static CustomRecipeIdResponseDto of(Long recipeId) {
        CustomRecipeIdResponseDto responseDto = new CustomRecipeIdResponseDto(recipeId);
        return responseDto;
    }

}