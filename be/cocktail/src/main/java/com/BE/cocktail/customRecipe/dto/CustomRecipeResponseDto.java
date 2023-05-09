package com.BE.cocktail.customRecipe.dto;

import com.BE.cocktail.customRecipe.CustomRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomRecipeResponseDto {

    private String name;

    private String imageUrl;



    public static CustomRecipeResponseDto of(CustomRecipe customRecipe) {
        CustomRecipeResponseDto customRecipeResponseDto = new CustomRecipeResponseDto();

        customRecipeResponseDto.setName(customRecipe.getName());
        customRecipeResponseDto.setImageUrl(customRecipe.getImageUrl());

        return customRecipeResponseDto;
    }
}
