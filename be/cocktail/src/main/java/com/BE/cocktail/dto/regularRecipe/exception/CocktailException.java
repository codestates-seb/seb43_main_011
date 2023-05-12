package com.BE.cocktail.dto.regularRecipe.exception;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import lombok.Getter;

@Getter
public class CocktailException extends RuntimeException{

    private final CocktailRtnConsts cocktailRtnConsts;

    public CocktailException(CocktailRtnConsts cocktailRtnConsts) {
        super(cocktailRtnConsts.getDescription());
        this.cocktailRtnConsts = cocktailRtnConsts;
    }

}
