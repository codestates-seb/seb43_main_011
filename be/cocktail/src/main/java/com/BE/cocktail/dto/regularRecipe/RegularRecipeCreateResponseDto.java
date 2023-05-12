package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeCreateResponseDto {

    private String name;

    private String description;

    private String recipe;

    private Integer alcVol;

    private String baseAlc;

    private String ingredient;

    private String imageUrl;

    private LocalDateTime createdAt;

}
