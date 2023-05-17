package com.BE.cocktail.dto.customRecipe;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class CustomRecipePostDto {

    @Pattern(regexp = "^[가-힣]+$")
    @NotBlank
    private String name;

    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$")
    @NotBlank
    private String description;

    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$")
    @NotBlank
    private String recipe;

    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$")
    @NotBlank
    private String ingredient;
}
