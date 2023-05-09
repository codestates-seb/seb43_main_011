package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomRecipePostDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDtoList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/custom")
public class CustomRecipeController {

    private final CustomRecipeService customRecipeService;

    @PostMapping("/submit")
    public ResponseEntity<CustomRecipeResponseDto> postCustomRecipe(@RequestBody CustomRecipePostDto customRecipePostDto) {

        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.saveCustomRecipe(customRecipePostDto);

        return ResponseEntity.ok(customRecipeResponseDto);
    }


    @GetMapping("/findAll")
    public ResponseEntity<CustomRecipeResponseDtoList> getCustomRecipeList() {

        CustomRecipeResponseDtoList customRecipeResponseDtoList = customRecipeService.findCustomRecipeList();

        return ResponseEntity.ok(customRecipeResponseDtoList);
    }


}
