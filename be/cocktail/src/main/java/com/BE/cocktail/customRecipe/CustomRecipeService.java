package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomRecipePostDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDtoList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomRecipeService {

    private final CustomRecipeRepository customRecipeRepository;


    public CustomRecipeResponseDto saveCustomRecipe(CustomRecipePostDto customRecipePostDto) {
        CustomRecipe customRecipe = CustomRecipe.of(customRecipePostDto);
        customRecipeRepository.save(customRecipe);

        return CustomRecipeResponseDto.of(customRecipe);
    }


    public CustomRecipeResponseDtoList findCustomRecipeList() {

        return CustomRecipeResponseDtoList.of(customRecipeRepository.findAll());
    }


}
