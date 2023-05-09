package com.BE.cocktail.regularRecipe.dto;

import com.BE.cocktail.ingredient.IngredientRequest;
import com.BE.cocktail.ingredient.IngredientResponses;
import com.BE.cocktail.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeCreateResponseDto {

    private String name;

    private String description;

    private String recipe;

    private Integer alcVol;

    private String baseAlc;

    private List<IngredientResponses> ingredient;

    private String imageUrl;

    private LocalDateTime createdAt;


    public static RegularRecipeCreateResponseDto of(List<RegularRecipe> regularRecipeList) {

        List<IngredientResponses> ingredient = IngredientResponses.listOf(regularRecipeList);

        RegularRecipeCreateResponseDto responseDto =
                new RegularRecipeCreateResponseDto(
                        regularRecipeList.get(0).getName(),
                        regularRecipeList.get(0).getDescription(),
                        regularRecipeList.get(0).getRecipe(),
                        regularRecipeList.get(0).getAlcVol(),
                        regularRecipeList.get(0).getBaseAlc(),
                        ingredient,
                        regularRecipeList.get(0).getImageUrl(),
                        regularRecipeList.get(0).getCreatedAt()
                );

        return responseDto;
    }

}
