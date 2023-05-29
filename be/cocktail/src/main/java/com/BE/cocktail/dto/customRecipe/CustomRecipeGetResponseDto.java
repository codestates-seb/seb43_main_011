package com.BE.cocktail.dto.customRecipe;

import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomRecipeGetResponseDto {

    private Long id;
    private String name;
    private String ingredient;
    private String recipe;

    private String description;
    private String imageUrl;

    private boolean wishList;

    //로그인 하지 않았을때 조회할시 wishList 무조건 false
    public static CustomRecipeGetResponseDto of(CustomRecipe customRecipe) {
        return new CustomRecipeGetResponseDto(
                customRecipe.getId(),
                customRecipe.getName(),
                customRecipe.getIngredient(),
                customRecipe.getRecipe(),
                customRecipe.getDescription(),
                customRecipe.getImageUrl(),
                false);
    }
// 상세조회시에 로그인 되었을때 본인이 북마크 한 레시피면 true로 반환
    public static CustomRecipeGetResponseDto bookmarkOf(CustomRecipe customRecipe, boolean check) {
        return new CustomRecipeGetResponseDto(
                customRecipe.getId(),
                customRecipe.getName(),
                customRecipe.getIngredient(),
                customRecipe.getRecipe(),
                customRecipe.getDescription(),
                customRecipe.getImageUrl(),
                check);
    }


}
