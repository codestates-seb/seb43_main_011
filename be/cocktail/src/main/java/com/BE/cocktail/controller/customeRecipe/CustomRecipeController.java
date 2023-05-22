package com.BE.cocktail.controller.customeRecipe;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.customRecipe.*;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.dto.utils.PageInfo;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.service.customRecipe.CustomRecipeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Api(tags = "customRecipe",description = "커스텀 레시피 API")
@RequestMapping(value = "/custom")
public class CustomRecipeController {

    private final CustomRecipeService customRecipeService;

    @ApiOperation(value = "커스텀 레시피 내용 등록")
    @PostMapping("/submit/content")
    public ApiResponse<CustomRecipeIdResponseDto> createContent(@RequestBody @Valid CustomRecipeCreateDto customRecipeCreateDto) {

        CustomRecipeIdResponseDto responseDto = customRecipeService.saveContentCustomRecipe(customRecipeCreateDto);

        return ApiResponse.ok(responseDto);
    }
    @ApiOperation(value = "커스텀 레시피 사진 등록")
    @PostMapping(value="/submit/image/{recipe_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> createCustomRecipe(@RequestPart(value="image") MultipartFile image, @PathVariable("recipe_id") Long recipeId) throws IOException {

        if(image.getSize() == 0) return ApiResponse.ok();

        customRecipeService.saveImageCustomRecipe(image, recipeId);

        return ApiResponse.created();
    }

    @ApiOperation(value = "커스텀 레시피 검색")
    @GetMapping("/search/{keyword}")
    public ApiResponse<MultiResponseDto<CustomSearchResponseDto>> searchCustom(@PathVariable("keyword") String keyword,
                                                                               @RequestParam int page,
                                                                               @RequestParam int size) {

        MultiResponseDto<CustomSearchResponseDto> responseDto = customRecipeService.searchRecipes(keyword, page - 1, size);

        return ApiResponse.ok(responseDto);
    }

    @ApiOperation(value = "커스텀 레시피 전체 조회")
    @GetMapping("/findAll")
    public ApiResponse<MultiResponseDto<CustomRecipeResponseDto>> findCustoms(@RequestParam int page, @RequestParam int size) {

        MultiResponseDto<CustomRecipeResponseDto> responseDto = customRecipeService.findCustoms(page - 1, size);

        return ApiResponse.ok(responseDto);
    }


    @ApiOperation(value = "커스텀 레시피 수정(내용)")
    @PatchMapping("/update/content/{recipe_id}")
    public ApiResponse<Void> updateContent(@RequestBody @Valid CustomUpdateDto customUpdateDto, @PathVariable("recipe_id") Long recipeId) {

        customRecipeService.updateCustomRecipe(recipeId, customUpdateDto);

        return ApiResponse.ok();
    }

    @ApiOperation(value = "커스텀 레시피 삭제")
    @DeleteMapping("/delete/{recipe_id}")
    public ApiResponse<Void> deleteCustomRecipe(@PathVariable("recipe_id") Long id) {

        customRecipeService.deleteCustomRecipe(id);

        return ApiResponse.deleted();
    }

    @ApiOperation(value = "커스텀 레시피 상세 조회")
    @GetMapping("/find/{recipe_id}")
    public ApiResponse<CustomRecipeGetResponseDto> findDetailInfo(@PathVariable("recipe_id") Long id) {
        CustomRecipeGetResponseDto response = customRecipeService.find(id);
        return ApiResponse.ok(response);
    }

    @ApiOperation(value = "나의 레시피 목록 조회")
    @GetMapping("/find/myRecipe")
    public ApiResponse<MultiResponseDto<CustomRecipeResponseDto>> findMyRecipe(@RequestParam int page, @RequestParam int size) {

        MultiResponseDto<CustomRecipeResponseDto> responseDto = customRecipeService.findMyRecipe(page - 1, size);

        return ApiResponse.ok(responseDto);
    }
}