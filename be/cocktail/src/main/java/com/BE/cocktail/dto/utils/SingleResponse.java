package com.BE.cocktail.dto.utils;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SingleResponse {

    private String name;

    private String ingredients;

    private String recipe;

}
