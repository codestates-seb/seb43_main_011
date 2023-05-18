package com.BE.cocktail.controller.customeRecipe;

import com.BE.cocktail.dto.apiResponse.ApiResponse;
import com.BE.cocktail.dto.customRecipe.*;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.service.customRecipe.CustomRecipeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Api(tags = "customRecipe",description = "커스텀 레시피 API")
@RequestMapping(value = "/custom")
public class CustomRecipeController {

    private final CustomRecipeService customRecipeService;

    @ApiOperation(value = "커스텀 레시피 등록")
    @PostMapping(value="/submit", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<CustomRecipeResponseDto> createCustomRecipe(@RequestPart(value="image") MultipartFile image, @RequestPart @Valid CustomRecipeCreateDto customRecipeCreateDto) throws IOException {
        //todo : 응답결과에 message만 전달
        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.saveCustomRecipe(image, customRecipeCreateDto);

        return ApiResponse.ok(customRecipeResponseDto);
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



    @PatchMapping(value="/update/{recipe_id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(value = "커스텀 레시피 수정")
    public ApiResponse<CustomRecipeResponseDto> updateCustomRecipe(@PathVariable("recipe_id") Long id,
                                                                      @RequestPart("image") MultipartFile image,
                                                                      @RequestPart @Valid CustomUpdateDto customUpdateDto) throws IOException {
        //todo : 응답결과에 message만 전달
        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.updateCustomRecipe(image, id, customUpdateDto);

        return ApiResponse.ok(customRecipeResponseDto);
    }

    @ApiOperation(value = "커스텀 레시피 삭제")
    @DeleteMapping("/delete/{recipe_id}")
    public ResponseEntity<Void> deleteCustomRecipe(@PathVariable("recipe_id") Long id) {

        customRecipeService.deleteCustomRecipe(id);

        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "커스텀 레시피 상세 조회")
    @GetMapping("/find/{recipe_id}")
    public ApiResponse<CustomRecipeGetResponseDto> findDetailInfo(@PathVariable("recipe_id") Long id) {
        CustomRecipeGetResponseDto response = customRecipeService.find(id);
        return ApiResponse.ok(response);
    }


}
