package com.BE.cocktail.ingredient;

import com.BE.cocktail.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class IngredientResponses {

    private String name;

    private String amount;

    public static IngredientResponses of(RegularRecipe regularRecipe) {

        IngredientResponses response = new IngredientResponses(regularRecipe.getName(), regularRecipe.getAmount());

        return response;
    }


    public static List<IngredientResponses> listOf(List<RegularRecipe> regularRecipes) {

        List<IngredientResponses> responses = regularRecipes.stream().map(IngredientResponses::of).collect(Collectors.toList());

        return responses;
    }
}
