package com.BE.cocktail.regularRecipe.dto;

import com.BE.cocktail.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.ingredient.IngredientResponses;
import com.BE.cocktail.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SingleResponse {

    private String name;

    private List<IngredientResponses> ingredients;

    private String recipe;

    public static SingleResponse of(List<RegularRecipe> regularRecipes) {

        List<IngredientResponses> ingredients = IngredientResponses.listOf(regularRecipes);

        if(regularRecipes.get(0) == null) {

            throw new CocktailException(CocktailRtnConsts.ERR400);

        }

        SingleResponse response = new SingleResponse(regularRecipes.get(0).getName(), ingredients, regularRecipes.get(0).getRecipe());

        return response;
    }
}
