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

    private Long id;

    private String name;

    private String imageUrl;

    private String description;



    public static CustomRecipeResponseDto of(CustomRecipe customRecipe) {
        CustomRecipeResponseDto customRecipeResponseDto = new CustomRecipeResponseDto();

        customRecipeResponseDto.setId(customRecipe.getId());
        customRecipeResponseDto.setName(customRecipe.getName());
        customRecipeResponseDto.setImageUrl(customRecipe.getImageUrl());
        customRecipeResponseDto.setDescription(customRecipeResponseDto.getDescription());

        return customRecipeResponseDto;
    }
}
