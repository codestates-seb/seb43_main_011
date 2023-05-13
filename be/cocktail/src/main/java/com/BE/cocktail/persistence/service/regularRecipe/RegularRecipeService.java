package com.BE.cocktail.persistence.service.regularRecipe;

import com.BE.cocktail.persistence.service.dto.regularRecipe.RegularRecipeGetResponseDto;
import com.BE.cocktail.persistence.service.dto.apiResponse.CocktailRtnConsts;

import com.BE.cocktail.persistence.service.dto.regularRecipe.RegularRecipeResponse;
import com.BE.cocktail.persistence.service.dto.regularRecipe.exception.CocktailException;
import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import com.BE.cocktail.persistence.repository.regularRecipe.RegularRecipeRepository;
import com.BE.cocktail.persistence.service.dto.utils.MultiResponseDto;
import com.BE.cocktail.persistence.service.dto.utils.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegularRecipeService {

    private final RegularRecipeRepository regularRecipeRepository;

    public RegularRecipeGetResponseDto find(Long id) {

        RegularRecipe regularRecipe = regularRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR400));

        return RegularRecipeGetResponseDto.of(regularRecipe);
    }

    @Transactional(readOnly = true)
    public MultiResponseDto<RegularRecipeResponse> findAlcVolRange(Integer alcVolRange, int page, int size) {

        // 알코올 도수별로 레시피를 보내주는 필터
        int startRange;
        int endRange;

        if (alcVolRange == 0) {
            startRange = alcVolRange;
            endRange = 0;
        } else if (alcVolRange == 1) {
            startRange = alcVolRange;
            endRange = 9;
        } else if (alcVolRange == 10) {
            startRange = alcVolRange;
            endRange = 19;
        } else if (alcVolRange == 20) {
            startRange = alcVolRange;
            endRange = 29;
        } else if (alcVolRange == 30) {
            startRange = alcVolRange;
            endRange = 39;
        } else {
            startRange = 40;
            endRange = Integer.MAX_VALUE;
        }

        Page<RegularRecipe> pages = regularRecipeRepository.findAllByAlcVolRange(startRange, endRange, PageRequest.of(page, size, Sort.by("alcVol").descending()));
        List<RegularRecipe> regularRecipes = pages.getContent();
        List<RegularRecipeResponse> regularRecipeResponses = RegularRecipeResponse.listOf(regularRecipes);
        PageInfo pageInfo = PageInfo.of(pages);
        return MultiResponseDto.of(regularRecipeResponses, pageInfo);
    }
}
