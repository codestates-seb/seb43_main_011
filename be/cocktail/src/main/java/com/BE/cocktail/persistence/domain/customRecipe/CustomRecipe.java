package com.BE.cocktail.persistence.domain.customRecipe;

import com.BE.cocktail.dto.customRecipe.CustomRecipeCreateDto;
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
    private Long memberId;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column(nullable = false)
    private boolean deleted;

    public static CustomRecipe of(CustomRecipeCreateDto customRecipeCreateDto, Long memberId) {
        CustomRecipe customRecipe = new CustomRecipe();

        customRecipe.setName(customRecipeCreateDto.getName());
        customRecipe.setDescription(customRecipeCreateDto.getDescription());
        customRecipe.setRecipe(customRecipeCreateDto.getRecipe());
        customRecipe.setIngredient(customRecipeCreateDto.getIngredient());
        customRecipe.setMemberId(memberId);

        return customRecipe;
    }

    public void insertImageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
    }
}
