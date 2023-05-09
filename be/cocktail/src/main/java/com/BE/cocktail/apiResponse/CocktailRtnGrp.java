package com.BE.cocktail.apiResponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum CocktailRtnGrp {

    Success(201),

    Validation(400);

    private int stautsCode;

}
