package com.BE.cocktail.dto.bookmark;

import com.BE.cocktail.persistence.domain.bookmark.Bookmark;
import lombok.Getter;

@Getter
public class BookmarkRequestDto {
    private Bookmark.RecipeType recipeType;
}
