package com.BE.cocktail.regularRecipe.dto;

import com.BE.cocktail.ingredient.IngredientRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeCreateDto {

    private String name;

    private String description;

    private String recipe;

    private Integer alcVol;

    private String baseAlc;

    private List<IngredientRequest> ingredientList;

    private String imageUrl;

    //test를 위한 정적팩토리메서드
    public static RegularRecipeCreateDto of(String name, String description, String recipe, Integer alcVol, String baseAlc,
                                            List<IngredientRequest> ingredientList, String imageUrl) {

        RegularRecipeCreateDto createDto = new RegularRecipeCreateDto(name, description, recipe, alcVol, baseAlc, ingredientList, imageUrl);

        return createDto;
    }

}
