package com.BE.cocktail.customRecipe;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
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

    @Lob
    @Column(nullable = false)
    private String imageUrl;

    @Size(max = 255)
    @Column(nullable = false, unique = true)
    private String name;

    @Lob
    private String description;

    @Lob
    private String recipe;

    @Size(max = 255)
    private String ingredient;

    @Size(max = 255)
    private String amount;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime modifiedAt;

    private LocalDateTime deletedAt;

}
