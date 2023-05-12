package com.BE.cocktail.dto.apiResponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum CocktailRtnGrp {

    Success(200),

    Validation(400);

    private int stautsCode;

}
