package com.BE.cocktail.regularRecipe;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RegularRecipeController {

    private final RegularRecipeService regularRecipeService;

}
