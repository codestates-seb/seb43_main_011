package com.BE.cocktail.regularRecipe;

import com.BE.cocktail.apiResponse.ApiResponse;
import com.BE.cocktail.regularRecipe.dto.RegularRecipeCreateDto;
import com.BE.cocktail.regularRecipe.dto.RegularRecipeCreateResponseDto;
import com.BE.cocktail.regularRecipe.dto.RegularRecipeSingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class RegularRecipeController {

    private final RegularRecipeService regularRecipeService;


    @PostMapping("/regular/create")
    public ApiResponse<RegularRecipeCreateResponseDto> createRegularRecipe(@RequestBody RegularRecipeCreateDto createdto) {

        RegularRecipeCreateResponseDto responseDto = regularRecipeService.saveRegularRecipe(createdto);

        return ApiResponse.ok(responseDto);
    }

    @GetMapping("/regular/find/{recipe_name}")
    public ApiResponse<RegularRecipeSingleResponseDto> findRegularRecipe(@PathVariable("recipe_name") String name) {

        RegularRecipeSingleResponseDto responseDto = regularRecipeService.findRecipe(name);

        return ApiResponse.ok(responseDto);
    }

}
