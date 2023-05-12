package com.BE.cocktail.controller.regularRecipe;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.regularRecipe.RegularRecipeGetResponseDto;

import com.BE.cocktail.dto.regularRecipe.RegularRecipeResponses;
import com.BE.cocktail.service.regularRecipe.RegularRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class RegularRecipeController {

    private final RegularRecipeService regularRecipeService;


    @GetMapping("/find/{recipe_id}")
    public ApiResponse<RegularRecipeGetResponseDto> findDetailInfo(@PathVariable("recipe_id") Long id) {

        RegularRecipeGetResponseDto response = regularRecipeService.find(id);

        return ApiResponse.ok(response);
    }

    @GetMapping(value = "/regular/findAll")
    public ApiResponse<RegularRecipeResponses> findRecipes() {

        RegularRecipeResponses responseDto = regularRecipeService.findAll();

        return ApiResponse.ok(responseDto);
    }


}
