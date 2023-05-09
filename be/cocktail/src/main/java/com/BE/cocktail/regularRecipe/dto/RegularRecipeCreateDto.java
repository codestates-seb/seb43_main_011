package com.BE.cocktail.regularRecipe.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RegularRecipeCreateDto {

    private String name;

    private String description;

    private String recipe;

    private Integer alcVol;

    private String baseAlc;

    private String ingredient;

    private String amount;

    private String imageUrl;

}
