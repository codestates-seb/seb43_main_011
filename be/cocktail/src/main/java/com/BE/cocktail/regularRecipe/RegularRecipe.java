package com.BE.cocktail.regularRecipe;

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
public class RegularRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @Lob
    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    private String recipe;

    @Column(nullable = false, columnDefinition = "TINYINT")
    private Integer alcVol;

    @Column(nullable = false)
    private String baseAlc;

    @Column(nullable = false)
    private String ingredient;

    @Column(nullable = false)
    private String amount;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime modifiedAt;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime deletedAt;

}
