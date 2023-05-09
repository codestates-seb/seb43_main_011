package com.BE.cocktail.ingredient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class IngredientRequest {

    private String name;

    private String amount;

    //test용 정적 팩토레 메서드
    public static IngredientRequest of(String name, String amount) {
        IngredientRequest response = new IngredientRequest(name, amount);

        return response;
    }

}
