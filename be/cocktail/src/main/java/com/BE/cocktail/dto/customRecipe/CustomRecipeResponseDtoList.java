package com.BE.cocktail.dto.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomRecipeResponseDtoList {

    private List<CustomRecipeResponseDto> data;


    public static CustomRecipeResponseDtoList of(List<CustomRecipe> all) {
        CustomRecipeResponseDtoList customRecipeList = new CustomRecipeResponseDtoList();
        List<CustomRecipeResponseDto> customRecipeResponseDtos = new ArrayList<>();

        for (int i = 0; i < all.size(); i++) {
            CustomRecipeResponseDto customRecipeResponseDto = CustomRecipeResponseDto.of(all.get(i));
            customRecipeResponseDtos.add(customRecipeResponseDto);
        }

        customRecipeList.setData(customRecipeResponseDtos);

        return customRecipeList;
    }
}
