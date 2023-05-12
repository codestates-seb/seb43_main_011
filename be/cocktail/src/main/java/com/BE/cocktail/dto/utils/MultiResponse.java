package com.BE.cocktail.dto.utils;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MultiResponse {
    private String name;
    private String imageUrl;

    public static MultiResponse of(RegularRecipe regularRecipe) {
        MultiResponse multiResponse = new MultiResponse();
        multiResponse.setName(regularRecipe.getName());
        multiResponse.setImageUrl(regularRecipe.getImageUrl());
        return multiResponse;
    }
}
