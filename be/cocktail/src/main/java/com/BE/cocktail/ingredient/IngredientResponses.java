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

    //RegularRecipeCreateResponseDto 생성시 그안에 ingredient부분이 재료리스트형태로 들어가야 하기 때문에 그것을 담당하는 클래스
    private String name;

    private String amount;

    public static IngredientResponses of(RegularRecipe regularRecipe) {

        IngredientResponses response = new IngredientResponses(regularRecipe.getIngredient(), regularRecipe.getAmount());

        return response;
    }


    public static List<IngredientResponses> listOf(List<RegularRecipe> regularRecipes) {

        List<IngredientResponses> responses = regularRecipes.stream().map(IngredientResponses::of).collect(Collectors.toList());

        return responses;
    }
}
