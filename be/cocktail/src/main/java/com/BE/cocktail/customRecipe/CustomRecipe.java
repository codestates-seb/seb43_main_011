package com.BE.cocktail.customRecipe;

import com.BE.cocktail.customRecipe.dto.CustomPatchDto;
import com.BE.cocktail.customRecipe.dto.CustomRecipePostDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

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
    private boolean status = true;

//    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "LAST_MODIFIED_AT")
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
