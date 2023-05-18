package com.BE.cocktail.persistence.domain.bookmark;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@NoArgsConstructor
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long recipeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecipeType recipeType;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column(nullable = false)
    private boolean deleted;

    private enum RecipeType {
        CUSTOM_RECIPE, REGULAR_RECIPE

    }
}
