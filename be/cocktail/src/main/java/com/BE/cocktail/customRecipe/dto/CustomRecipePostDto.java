package com.BE.cocktail.customRecipe.dto;

import com.BE.cocktail.ingredient.IngredientRequest;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class CustomRecipePostDto {

    @NotBlank
    private String imageUrl;

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String recipe;

    @NotBlank
    private String ingredient;
}
