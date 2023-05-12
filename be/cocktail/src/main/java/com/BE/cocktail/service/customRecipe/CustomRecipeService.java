package com.BE.cocktail.service.customRecipe;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.repository.customRecipe.CustomRecipeRepository;
import com.BE.cocktail.dto.customRecipe.CustomPatchDto;
import com.BE.cocktail.dto.customRecipe.CustomRecipePostDto;
import com.BE.cocktail.dto.customRecipe.CustomRecipeResponseDto;
import com.BE.cocktail.dto.customRecipe.CustomRecipeResponseDtoList;
import com.BE.cocktail.exception.CocktailException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
        List<CustomRecipe> customRecipeList = customRecipeRepository.findByDeletedFalse();
        return CustomRecipeResponseDtoList.of(customRecipeList);
    }


    public CustomRecipeResponseDto updateCustomRecipe(Long id, CustomPatchDto customPatchDto) {

        CustomRecipe updateCustomRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);


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

        updateCustomRecipe.setModifiedAt(LocalDateTime.now());

        customRecipeRepository.save(updateCustomRecipe);

        return CustomRecipeResponseDto.of(updateCustomRecipe);
    }


//    public void deleteCustomRecipe(Long id) {
//        CustomRecipe existingRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);
//        existingRecipe.setDeleted(true);
//        customRecipeRepository.save(existingRecipe);
//    }

    public void deleteCustomRecipe(Long id) {
        CustomRecipe existingRecipe = customRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR403));

        if (existingRecipe.isDeleted()) {
            throw new CocktailException(CocktailRtnConsts.ERR404);
        }

        existingRecipe.setDeleted(true);
        existingRecipe.setModifiedAt(LocalDateTime.now());
        customRecipeRepository.save(existingRecipe);

        // 삭제가 성공적으로 이루어졌을 때는 성공 메시지를 반환
        throw new CocktailException(CocktailRtnConsts.SCC203);
    }


}
