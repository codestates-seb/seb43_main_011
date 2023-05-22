package com.BE.cocktail.dto.bookmark;

import com.BE.cocktail.dto.customRecipe.CustomRecipeResponseDtoList;
import com.BE.cocktail.dto.regularRecipe.RegularSearchResponseDto;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BookmarkFindAllResponseDto {
    private List data;

    public static BookmarkFindAllResponseDto of(List<CustomRecipe> customRecipes, List<RegularRecipe> regularRecipes) {
        BookmarkFindAllResponseDto responseDto = new BookmarkFindAllResponseDto();

        List data = new ArrayList();

        data.addAll(CustomRecipeResponseDtoList.of(customRecipes).getData());
        data.addAll(RegularSearchResponseDto.listOf(regularRecipes));

        responseDto.setData(data);

        return responseDto;
    }
}
