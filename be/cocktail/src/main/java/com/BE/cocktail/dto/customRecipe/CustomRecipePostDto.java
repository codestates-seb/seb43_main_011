package com.BE.cocktail.dto.customRecipe;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CustomRecipePostDto {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String recipe;

    @NotBlank
    private String ingredient;
}
