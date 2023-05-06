package com.BE.cocktail.regularBookmark;

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
public class RegularBookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, columnDefinition = "TINYINT")
    private Long id;

    @Column(nullable = false)
    private Long regularRecipeId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime modifiedAt;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime deletedAt;

}
