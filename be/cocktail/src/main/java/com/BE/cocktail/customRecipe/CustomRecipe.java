package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomRecipePostDto;
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

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    private String recipe;

    private String ingredient;

    private String amount;

    @Column(nullable = false)
    private boolean status;

//    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt;

    private LocalDateTime deletedAt;


    public static CustomRecipe of(CustomRecipePostDto customRecipePostDto) {
        CustomRecipe customRecipe = new CustomRecipe();

        customRecipe.setName(customRecipePostDto.getName());
        customRecipe.setDescription(customRecipePostDto.getDescription());
        customRecipe.setRecipe(customRecipePostDto.getRecipe());
        customRecipe.setIngredient(customRecipePostDto.getIngredient());
        customRecipe.setAmount(customRecipePostDto.getAmount());
        customRecipe.setImageUrl(customRecipePostDto.getImageUrl());

        return customRecipe;
    }
}
