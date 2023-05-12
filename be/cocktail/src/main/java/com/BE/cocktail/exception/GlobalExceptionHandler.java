package com.BE.cocktail.exception;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CocktailException.class)
    @ResponseStatus(BAD_REQUEST)
    public ApiResponse<?> handleCocktailException(CocktailException ex) {

        return ApiResponse.notContent(ex.getCocktailRtnConsts(),ex.getMessage());
    }

}
