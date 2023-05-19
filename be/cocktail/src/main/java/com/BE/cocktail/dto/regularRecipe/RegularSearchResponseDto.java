package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularSearchResponseDto {

    private Long id;

    private String name;

    private String imageUrl;

    private String ingredient;

    public static RegularSearchResponseDto of(RegularRecipe recipe) {

        RegularSearchResponseDto response = new RegularSearchResponseDto(recipe.getId(), recipe.getName(), recipe.getImageUrl(), recipe.getIngredient());

        return response;
    }

    public static List<RegularSearchResponseDto> listOf(List<RegularRecipe> recipes) {

        List<RegularSearchResponseDto> list = recipes.stream().map(RegularSearchResponseDto::of).collect(Collectors.toList());

        return list;
    }



}
