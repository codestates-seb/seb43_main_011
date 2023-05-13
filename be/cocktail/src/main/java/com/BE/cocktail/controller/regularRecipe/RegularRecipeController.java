package com.BE.cocktail.controller.regularRecipe;

import com.BE.cocktail.persistence.service.dto.apiResponse.ApiResponse;
import com.BE.cocktail.persistence.service.dto.regularRecipe.RegularRecipeGetResponseDto;

import com.BE.cocktail.persistence.service.dto.regularRecipe.RegularRecipeResponse;
import com.BE.cocktail.persistence.service.dto.utils.MultiResponseDto;
import com.BE.cocktail.persistence.service.regularRecipe.RegularRecipeService;
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


    @GetMapping("/regular/findAll/{alc_vol}")
    public ApiResponse<MultiResponseDto<RegularRecipeResponse>> findRecipes(@PathVariable("alc_vol") Integer alcVolRange,
                                                                            @RequestParam int page,
                                                                            @RequestParam int size) {
        MultiResponseDto<RegularRecipeResponse> responseDto = regularRecipeService.findAlcVolRange(alcVolRange, page - 1, size);
        return ApiResponse.ok(responseDto);
    }

}
