package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeGetResponseDto {

    private Long id;

    private String name;

    private String ingredient;

    private String description;

    private String recipe;

    private String imageUrl;

    private boolean wishList;

    public static RegularRecipeGetResponseDto of(RegularRecipe regularRecipe, boolean check) {

        return new RegularRecipeGetResponseDto(
                regularRecipe.getId(),
                regularRecipe.getName(),
                regularRecipe.getIngredient(),
                regularRecipe.getDescription(),
                regularRecipe.getRecipe(),
                regularRecipe.getImageUrl(),
                check);
    }
}
