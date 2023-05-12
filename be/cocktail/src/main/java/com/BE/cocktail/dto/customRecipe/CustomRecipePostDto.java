package com.BE.cocktail.dto.customRecipe;

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
