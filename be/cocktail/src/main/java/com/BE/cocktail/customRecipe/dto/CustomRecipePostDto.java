package com.BE.cocktail.customRecipe.dto;

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

    @NotBlank
    private String amount;

    @NotBlank
    private String imageUrl;

}
