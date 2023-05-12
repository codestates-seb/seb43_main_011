package com.BE.cocktail.dto.customRecipe;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CustomPatchDto {

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
