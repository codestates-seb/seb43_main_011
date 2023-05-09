package com.BE.cocktail.regularRecipe;

import com.BE.cocktail.regularRecipe.dto.RegularRecipeCreateDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
//@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RegularRecipe {

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

    //id와 시간 데이터를 뺀 생성자
    private RegularRecipe(String imageUrl,
                          String name,
                          String description,
                          String recipe,
                          Integer alcVol,
                          String baseAlc,
                          String ingredient,
                          String amount) {

        this.imageUrl = imageUrl;
        this.name = name;
        this.description = description;
        this.recipe = recipe;
        this.alcVol = alcVol;
        this.baseAlc = baseAlc;
        this.ingredient = ingredient;
        this.amount = amount;
    }

    public static RegularRecipe of(RegularRecipeCreateDto createdto) {
        RegularRecipe regularRecipe = new RegularRecipe(
                createdto.getImageUrl(),
                createdto.getName(),
                createdto.getDescription(),
                createdto.getRecipe(),
                createdto.getAlcVol(),
                createdto.getBaseAlc(),
                createdto.getIngredient(),
                createdto.getAmount()
        );

        return regularRecipe;
    }
}
