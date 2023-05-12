package com.BE.cocktail.persistence.domain.customRecipe;

import com.BE.cocktail.dto.customRecipe.CustomRecipePostDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

//    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String recipe;

    @Column(nullable = false)
    private String ingredient;

    @Column(nullable = false)
    private boolean deleted;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();



    public static CustomRecipe of(CustomRecipePostDto customRecipePostDto) {
        CustomRecipe customRecipe = new CustomRecipe();

        customRecipe.setImageUrl(customRecipePostDto.getImageUrl());
        customRecipe.setName(customRecipePostDto.getName());
        customRecipe.setDescription(customRecipePostDto.getDescription());
        customRecipe.setRecipe(customRecipePostDto.getRecipe());
        customRecipe.setIngredient(customRecipePostDto.getIngredient());

        return customRecipe;
    }

}
