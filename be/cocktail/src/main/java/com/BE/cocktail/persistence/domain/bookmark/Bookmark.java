package com.BE.cocktail.persistence.domain.bookmark;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
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

    public Bookmark(Long memberId, Long recipeId, RecipeType recipeType) {
        this.memberId = memberId;
        this.recipeId = recipeId;
        this.recipeType = recipeType;
    }

    public static Bookmark of(Long recipeId, RecipeType recipeType, Long memberId) {
        Bookmark bookmark = new Bookmark(memberId, recipeId, recipeType);
        return bookmark;
    }

    public void update() {
        this.setModifiedAt(LocalDateTime.now());
        this.setDeleted(false);
    }

    public void cancel() {
        this.setModifiedAt(LocalDateTime.now());
        this.setDeleted(true);
    }


    public enum RecipeType {
        CUSTOM_RECIPE, REGULAR_RECIPE

    }
}
