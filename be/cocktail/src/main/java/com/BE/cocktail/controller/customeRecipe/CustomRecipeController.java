package com.BE.cocktail.controller.customeRecipe;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.customRecipe.*;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.service.customRecipe.CustomRecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/custom")
public class CustomRecipeController {

    private final CustomRecipeService customRecipeService;

    @PostMapping(value="/submit", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<CustomRecipeResponseDto> postCustomRecipe(@RequestPart(value="image") MultipartFile image, @RequestPart CustomRecipePostDto customRecipePostDto) throws IOException {

        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.saveCustomRecipe(image, customRecipePostDto);

        return ApiResponse.ok(customRecipeResponseDto);
    }


    @GetMapping("/findAll")
    public ApiResponse<CustomRecipeResponseDtoList> getCustomRecipeList() {

        CustomRecipeResponseDtoList customRecipeResponseDtoList = customRecipeService.findCustomRecipeList();

        return ApiResponse.ok(customRecipeResponseDtoList);
    }

    @GetMapping("/search/{keyword}")
    public ApiResponse<MultiResponseDto<CustomSearchResponseDto>> getSearchPaging(@PathVariable("keyword") String keyword,
                                                                                  @RequestParam int page,
                                                                                  @RequestParam int size) {

        MultiResponseDto<CustomSearchResponseDto> responseDto = customRecipeService.searchPaging(keyword, page - 1, size);

        return ApiResponse.ok(responseDto);
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

    @GetMapping("/find/{recipe_id}")
    public ApiResponse<CustomRecipeGetResponseDto> findDetailInfo(@PathVariable("recipe_id") Long id) {
        CustomRecipeGetResponseDto response = customRecipeService.find(id);
        return ApiResponse.ok(response);
    }


}
