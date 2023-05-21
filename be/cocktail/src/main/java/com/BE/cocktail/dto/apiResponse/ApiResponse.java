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

    public static <T> ApiResponse<T> ok() {
        return new ApiResponse<>(
                CocktailRtnConsts.NRM000,
                CocktailRtnConsts.NRM000.getDescription(),
                CocktailRtnConsts.NRM000.getCode(),
                null
        );
    }

    public static <T> ApiResponse<T> deleted() {
        return new ApiResponse<>(
                CocktailRtnConsts.SCC202,
                CocktailRtnConsts.SCC202.getDescription(),
                CocktailRtnConsts.SCC202.getCode(),
                null
        );
    }

    public static <T> ApiResponse<T> created() {
        return new ApiResponse<>(
                CocktailRtnConsts.SCC203,
                CocktailRtnConsts.SCC203.getDescription(),
                CocktailRtnConsts.SCC203.getCode(),
                null
        );
    }

    public static <T> ApiResponse<T> bookmark() {
        return new ApiResponse<>(
                CocktailRtnConsts.SCC204,
                CocktailRtnConsts.SCC204.getDescription(),
                CocktailRtnConsts.SCC204.getCode(),
                null
        );
    }
    public static <T> ApiResponse<T> cancelBookmark() {
        return new ApiResponse<>(
                CocktailRtnConsts.SCC205,
                CocktailRtnConsts.SCC205.getDescription(),
                CocktailRtnConsts.SCC205.getCode(),
                null
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
