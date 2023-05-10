package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomPatchDto;
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


    @PatchMapping("/update/{recipe_name}")
    public ResponseEntity<CustomRecipeResponseDto> updateCustomRecipe(@PathVariable("recipe_name") String name,
                                                                      @RequestBody CustomPatchDto customPatchDto) {

        CustomRecipeResponseDto customRecipeResponseDto = customRecipeService.updateCustomRecipe(name, customPatchDto);

        return ResponseEntity.ok(customRecipeResponseDto);
    }

    @DeleteMapping("/delete/{recipe_name}")
    public ResponseEntity<Void> deleteCustomRecipe(@PathVariable("recipe_name") String name) {

        customRecipeService.deleteCustomRecipe(name);

        return ResponseEntity.noContent().build();
    }


}
