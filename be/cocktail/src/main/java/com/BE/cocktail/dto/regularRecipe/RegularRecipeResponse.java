package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegularRecipeResponse {
    private String name;
    private String imageUrl;

    public static RegularRecipeResponse of(RegularRecipe regularRecipe) {
        RegularRecipeResponse response = new RegularRecipeResponse();
        response.setName(regularRecipe.getName());
        response.setImageUrl(regularRecipe.getImageUrl());
        return response;
    }
}
