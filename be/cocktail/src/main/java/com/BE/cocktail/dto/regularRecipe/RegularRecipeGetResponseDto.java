package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipeGetResponseDto {

    private Long id;

    private String name;

    private String ingredient;

    private String description;

    private String recipe;

    private String imageUrl;

    private boolean wishList;
// 로그인 하지 않았을시 반환하는 메서드 무조건 false
    public static RegularRecipeGetResponseDto of(RegularRecipe regularRecipe) {

        return new RegularRecipeGetResponseDto(
                regularRecipe.getId(),
                regularRecipe.getName(),
                regularRecipe.getIngredient(),
                regularRecipe.getDescription(),
                regularRecipe.getRecipe(),
                regularRecipe.getImageUrl(),
                false);
    }
// 로그인 했을때 본인이 북마크 한 레시피이면 true 아니면 false
    public static RegularRecipeGetResponseDto bookmarkof(RegularRecipe regularRecipe, boolean check) {

        return new RegularRecipeGetResponseDto(
                regularRecipe.getId(),
                regularRecipe.getName(),
                regularRecipe.getIngredient(),
                regularRecipe.getDescription(),
                regularRecipe.getRecipe(),
                regularRecipe.getImageUrl(),
                check);
    }
}
