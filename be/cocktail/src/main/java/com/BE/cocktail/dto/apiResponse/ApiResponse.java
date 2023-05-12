package com.BE.cocktail.dto.apiResponse;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiResponse<T> {

    @JsonIgnore
    private final CocktailRtnConsts status;

    private final String message;

    private final int code;

    private final T data;

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(
                CocktailRtnConsts.NRM000,
                CocktailRtnConsts.NRM000.getDescription(),
                CocktailRtnConsts.NRM000.getCode(),
                data
        );
    }

    public static <T> ApiResponse<T> notContent(CocktailRtnConsts status, String message) {

        return new ApiResponse<>(
            status,
            message,
            status.getCode(),
            null
        );
    }
}
