package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomPatchDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipePostDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipeResponseDtoList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        List<CustomRecipe> customRecipeList = customRecipeRepository.findByStatusTrue();
        return CustomRecipeResponseDtoList.of(customRecipeList);
    }


    public CustomRecipeResponseDto updateCustomRecipe(String name, CustomPatchDto customPatchDto) {

        CustomRecipe updateCustomRecipe = customRecipeRepository.findByName(name);

        if (customPatchDto.getImageUrl() != null) {
            updateCustomRecipe.setImageUrl(customPatchDto.getImageUrl());
        }
        if (customPatchDto.getName() != null) {
            updateCustomRecipe.setName(customPatchDto.getName());
        }
        if (customPatchDto.getDescription() != null) {
            updateCustomRecipe.setDescription(customPatchDto.getDescription());
        }
        if (customPatchDto.getRecipe() != null) {
            updateCustomRecipe.setRecipe(customPatchDto.getRecipe());
        }
        if (customPatchDto.getIngredient() != null) {
            updateCustomRecipe.setIngredient(customPatchDto.getIngredient());
        }
        if (customPatchDto.getAmount() != null) {
            updateCustomRecipe.setAmount(customPatchDto.getAmount());
        }

        updateCustomRecipe.setModifiedAt(LocalDateTime.now());

        customRecipeRepository.save(updateCustomRecipe);

        return CustomRecipeResponseDto.of(updateCustomRecipe);
    }


    public void deleteCustomRecipe(String name) {
        CustomRecipe existingRecipe = customRecipeRepository.findByName(name);
        existingRecipe.setDeletedAt(LocalDateTime.now());
        existingRecipe.setStatus(false);
        customRecipeRepository.save(existingRecipe);
    }

}
