package com.BE.cocktail.persistence.repository.bookmark;

import com.BE.cocktail.persistence.domain.bookmark.Bookmark;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT c FROM CustomRecipe c WHERE c.id = :id")
    Optional<CustomRecipe> findCustomById(Long id);

    @Query("SELECT r FROM RegularRecipe r WHERE r.id = :id")
    Optional<RegularRecipe> findRegularById(Long id);

    @Query("SELECT b FROM Bookmark b WHERE b.memberId = :memberId AND b.recipeId = :id And b.recipeType = :recipeType")
    Bookmark findByRecipe(Long memberId, Long id, Bookmark.RecipeType recipeType);

    @Query("SELECT b FROM Bookmark b WHERE b.memberId = :memberId And b.recipeType = :recipeType And b.deleted = false")
    List<Bookmark> findAllCustomByMemberId(Long memberId, Bookmark.RecipeType recipeType);

    @Query("SELECT b FROM Bookmark b WHERE b.memberId = :memberId And b.recipeType = :recipeType And b.deleted = false")
    List<Bookmark> findAllRegularByMemberId(Long memberId, Bookmark.RecipeType recipeType);
}