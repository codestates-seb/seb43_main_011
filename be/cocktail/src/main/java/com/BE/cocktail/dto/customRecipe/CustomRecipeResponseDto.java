package com.BE.cocktail.dto.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
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
