//package com.BE.cocktail.regularRecipe;
//
//import com.BE.cocktail.CocktailApplication;
//import com.BE.cocktail.database.DatabaseCleaner;
//import com.BE.cocktail.ingredient.IngredientRequest;
//import com.BE.cocktail.ingredient.IngredientResponses;
//import com.BE.cocktail.dto.regularRecipe.RegularRecipeCreateDto;
//import com.BE.cocktail.dto.regularRecipe.RegularRecipeCreateResponseDto;
//import com.BE.cocktail.dto.regularRecipe.RegularRecipeSingleResponseDto;
//import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
//import com.BE.cocktail.persistence.repository.regularRecipe.RegularRecipeRepository;
//import com.BE.cocktail.service.regularRecipe.RegularRecipeService;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//
//@SpringBootTest(classes = CocktailApplication.class) //스프링부트 초기화
//@TestPropertySource(properties = {"spring.config.location = classpath:test.yml"})
//class RegularRecipeServiceTest {
//
//    @Autowired
//    RegularRecipeService regularRecipeService;
//
//    @Autowired
//    RegularRecipeRepository regularRecipeRepository;
//
//    @Autowired
//    DatabaseCleaner databaseCleaner;
//
//    RegularRecipe regularRecipe = RegularRecipe.of("imageUrl", "name", "description", "recipe", 1, "baseAlc", "ingredient", "amount");
//    RegularRecipe regularRecipe1 = RegularRecipe.of("imageUrl", "name", "description", "recipe", 1, "baseAlc", "ingredient1", "amount1");
//
//    @BeforeEach
//    void setup() {
//        regularRecipeRepository.save(regularRecipe);
//        regularRecipeRepository.save(regularRecipe1);
//    }
//    @AfterEach
//    void clean() {
//        databaseCleaner.execute();
//    }
//
//    @DisplayName("정규레시피 불러오기 성공")
//    @Transactional
//    @Test
//    void findRecipe() {
//        //given
//        String name = "name";
//
//        //when
//        RegularRecipeSingleResponseDto result = regularRecipeService.findRecipe(name);
//
//        //then
//        assertThat(regularRecipe.getName()).isEqualTo(result.getResponse().getName());
//        assertThat(regularRecipe.getRecipe()).isEqualTo(result.getResponse().getRecipe());
//
//        IngredientResponses resultIngredient1 = result.getResponse().getIngredients().get(0);
//        assertThat(regularRecipe.getIngredient()).isEqualTo(resultIngredient1.getName());
//
//
//    }
//
//    @DisplayName("정규레시피 생성 성공")
//    @Transactional
//    @Test
//    void saveRegularRecipe() {
//        //given
//        IngredientRequest ingredient1 = IngredientRequest.of("ingredient1","1ml");
//        IngredientRequest ingredient2 = IngredientRequest.of("ingredient2", "2ml");
//        List<IngredientRequest> ingredientRequestList = List.of(ingredient1, ingredient2);
//
//        RegularRecipeCreateDto createDto = RegularRecipeCreateDto.of("name", "description", "recipe",5,
//                "baseAlc", ingredientRequestList, "imageUrl");
//
//        //when
//        List<RegularRecipe> regularRecipes = RegularRecipe.listOf(createDto);
//        RegularRecipeCreateResponseDto result = RegularRecipeCreateResponseDto.of(regularRecipes);
//
//        //then
//        assertThat(createDto.getName()).isEqualTo(result.getName());
//        assertThat(createDto.getDescription()).isEqualTo(result.getDescription());
//        assertThat(createDto.getRecipe()).isEqualTo(result.getRecipe());
//        assertThat(createDto.getAlcVol()).isEqualTo(result.getAlcVol());
//        assertThat(createDto.getBaseAlc()).isEqualTo(result.getBaseAlc());
//        assertThat(createDto.getImageUrl()).isEqualTo(result.getImageUrl());
//
//        List<IngredientResponses> ingredientList = result.getIngredient();
//        assertEquals(2, ingredientList.size());
//
//        IngredientResponses resultIngredient = ingredientList.get(0);
//        assertEquals("ingredient1", resultIngredient.getName());
//        assertEquals("1ml", resultIngredient.getAmount());
//
//    }
//}