package com.BE.cocktail.dto.customRecipe;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class CustomRecipeCreateDto {


    @Pattern(regexp = "^([가-힣\\(\\)\\{\\}\\[\\]]+\\s*)*$")
    @Size(min=1, max=255)
    @NotBlank
    private String name;

    @Pattern(regexp = "^([가-힣a-zA-Z0-9.!\\(\\)\\{\\}\\[\\]]+\\s*)*$")
    @Size(min=1, max=255)
    @NotBlank
    private String description;

    @Size(max=900)
    @NotBlank
    private String recipe;

    @Pattern(regexp = "^([가-힣a-zA-Z0-9]+\\s*)*$")
    @NotBlank
    private String ingredient;

}