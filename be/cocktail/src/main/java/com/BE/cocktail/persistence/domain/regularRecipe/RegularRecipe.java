package com.BE.cocktail.persistence.domain.regularRecipe;

import lombok.*;

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

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String recipe;

    @Column(nullable = false)
    private String ingredient;

    @Column(nullable = false, columnDefinition = "TINYINT")
    private Integer alcVol;

    @Column(nullable = false)
    private String baseAlc;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private final LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt;

    @Column(nullable = false)
    private boolean deleted;

}
