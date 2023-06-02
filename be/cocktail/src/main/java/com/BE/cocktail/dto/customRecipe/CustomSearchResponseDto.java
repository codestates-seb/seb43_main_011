package com.BE.cocktail.dto.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomSearchResponseDto {

    private Long id;

    private String name;

    private String imageUrl;

    private String ingredient;

    public static CustomSearchResponseDto of(CustomRecipe recipe) {

        CustomSearchResponseDto response = new CustomSearchResponseDto(recipe.getId(), recipe.getName(), recipe.getImageUrl(), recipe.getIngredient());

        return response;
    }

    public static List<CustomSearchResponseDto> listOf(List<CustomRecipe> customRecipes) {

        List<CustomSearchResponseDto> list = customRecipes.stream().map(CustomSearchResponseDto::of).collect(Collectors.toList());

        return list;
    }



}
