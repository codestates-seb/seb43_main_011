package com.BE.cocktail.controller.customeRecipe;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.service.customRecipe.CustomRecipeService;
import com.BE.cocktail.dto.customRecipe.CustomPatchDto;
import com.BE.cocktail.dto.customRecipe.CustomRecipePostDto;
import com.BE.cocktail.dto.customRecipe.CustomRecipeResponseDto;
import com.BE.cocktail.dto.customRecipe.CustomRecipeResponseDtoList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/custom")
public class CustomRecipeController {

    private final CustomRecipeService customRecipeService;

    @PostMapping("/submit")
    public ApiResponse<CustomRecipeResponseDto> postCustomRecipe(@RequestBody CustomRecipePostDto customRecipePostDto) {

        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.saveCustomRecipe(customRecipePostDto);

        return ApiResponse.ok(customRecipeResponseDto);
    }


    @GetMapping("/findAll")
    public ApiResponse<CustomRecipeResponseDtoList> getCustomRecipeList() {

        CustomRecipeResponseDtoList customRecipeResponseDtoList = customRecipeService.findCustomRecipeList();

        return ApiResponse.ok(customRecipeResponseDtoList);
    }

    @GetMapping("/find")
    public ApiResponse<MultiResponseDto<CustomRecipeResponseDto>> getCustomRecipePaging(@RequestParam int page, @RequestParam int size) {

        MultiResponseDto<CustomRecipeResponseDto> responseDto = customRecipeService.paging(page - 1, size);

        return ApiResponse.ok(responseDto);
    }


    @PatchMapping("/update/{recipe_id}")
    public ApiResponse<CustomRecipeResponseDto> updateCustomRecipe(@PathVariable("recipe_id") Long id,
                                                                      @RequestBody CustomPatchDto customPatchDto) {

        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.updateCustomRecipe(id, customPatchDto);

        return ApiResponse.ok(customRecipeResponseDto);
    }

    @DeleteMapping("/delete/{recipe_id}")
    public ResponseEntity<Void> deleteCustomRecipe(@PathVariable("recipe_id") Long id) {

        customRecipeService.deleteCustomRecipe(id);

        return ResponseEntity.noContent().build();
    }


}
