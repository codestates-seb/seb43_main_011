package com.BE.cocktail.dto.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomRecipeGetResponseDto {

    private Long id;
    private String name;
    private String ingredient;
    private String recipe;

    private String description;
    private String imageUrl;

    public static CustomRecipeGetResponseDto of(CustomRecipe customRecipe) {
        return new CustomRecipeGetResponseDto(
                customRecipe.getId(),
                customRecipe.getName(),
                customRecipe.getIngredient(),
                customRecipe.getRecipe(),
                customRecipe.getDescription(),
                customRecipe.getImageUrl());
    }


}
