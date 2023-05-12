package com.BE.cocktail.dto.regularRecipe;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeCreateDto {

    private String name;

    private String description;

    private String recipe;

    private Integer alcVol;

    private String baseAlc;

    private String ingredient;

    private String imageUrl;


}
