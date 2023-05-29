package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class RegularRecipeResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private String description;

    public static RegularRecipeResponse of(RegularRecipe regularRecipe) {
        RegularRecipeResponse response = new RegularRecipeResponse();
        response.setId(regularRecipe.getId());
        response.setName(regularRecipe.getName());
        response.setImageUrl(regularRecipe.getImageUrl());
        response.setDescription(regularRecipe.getDescription());
        return response;
    }

    public static List<RegularRecipeResponse> listOf(List<RegularRecipe> regularRecipes) {

        List<RegularRecipeResponse> list = regularRecipes.stream()
                .map(RegularRecipeResponse::of)
                .collect(Collectors.toList());
        return list;
    }
}
