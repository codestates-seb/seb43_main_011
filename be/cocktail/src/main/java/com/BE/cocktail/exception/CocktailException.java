package com.BE.cocktail.exception;

import com.BE.cocktail.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.apiResponse.CocktailRtnGrp;
import lombok.Getter;

@Getter
public class CocktailException extends RuntimeException{

    private final CocktailRtnConsts cocktailRtnConsts;

    public CocktailException(CocktailRtnConsts cocktailRtnConsts) {
        super(cocktailRtnConsts.getDescription());
        this.cocktailRtnConsts = cocktailRtnConsts;
    }

}
