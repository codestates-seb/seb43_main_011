package com.BE.cocktail.customRecipe;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CustomRecipeController {

    private final CustomRecipeService customRecipeService;

}
