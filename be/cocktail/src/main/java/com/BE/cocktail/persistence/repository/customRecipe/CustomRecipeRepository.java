package com.BE.cocktail.persistence.repository.customRecipe;

import com.BE.cocktail.persistence.domain.bookmark.Bookmark;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomRecipeRepository extends JpaRepository<CustomRecipe, Long> {

    Page<CustomRecipe> findAllByDeletedFalse(PageRequest pageRequest);

    @Query("SELECT c FROM CustomRecipe c WHERE (c.name LIKE %:keyword% OR c.ingredient LIKE %:keyword%) AND c.deleted = false")
    Page<CustomRecipe> findAllByKeyword(String keyword, PageRequest pageRequest);

    @Query("SELECT r FROM CustomRecipe r WHERE r.memberId = :memberId AND r.deleted = false")
    Page<CustomRecipe> findByMemberId(Long memberId, PageRequest pageRequest);

    @Query("SELECT b FROM Bookmark b WHERE b.memberId = :memberId AND b.recipeId = :id AND b.recipeType = :recipeType AND b.deleted = false")
    Optional<Bookmark> findBookmarkById(Long memberId, Long id, Bookmark.RecipeType recipeType);
}
