package com.BE.cocktail.regularRecipe.dto;

import com.BE.cocktail.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;


import java.time.LocalDateTime;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeCreateResponseDto {

    private String name;

    private String description;

    private String recipe;

    private Integer alcVol;

    private String ingredient;

    private String amount;

    private String imageUrl;

    private LocalDateTime createdAt;

    public static RegularRecipeCreateResponseDto of(RegularRecipe regularRecipe) {

        RegularRecipeCreateResponseDto response = new RegularRecipeCreateResponseDto(
                regularRecipe.getName(),
                regularRecipe.getDescription(),
                regularRecipe.getRecipe(),
                regularRecipe.getAlcVol(),
                regularRecipe.getIngredient(),
                regularRecipe.getAmount(),
                regularRecipe.getImageUrl(),
                regularRecipe.getCreatedAt()
        );

        return response;
    }

}
