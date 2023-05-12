package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import com.BE.cocktail.dto.utils.MultiResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Setter
@Getter
public class RegularRecipeMultiResponseDto {

    private Map<String, List<MultiResponse>> response;

    public RegularRecipeMultiResponseDto() {
        this.response = new LinkedHashMap<>();
    }

    public static RegularRecipeMultiResponseDto of(List<RegularRecipe> regularRecipes) {
        RegularRecipeMultiResponseDto responseDto = new RegularRecipeMultiResponseDto();

        // 알콜 도수별 그룹화 및 중복된 이름 필터링
        for (RegularRecipe regularRecipe : regularRecipes) {
            String name = regularRecipe.getName();
            String alcoholRange = getAlcoholRange(regularRecipe.getAlcVol());
            MultiResponse regularRecipeDto = MultiResponse.of(regularRecipe);

            if (!responseDto.getResponse().containsKey(alcoholRange)) {
                responseDto.getResponse().put(alcoholRange, new ArrayList<>());
            }
            List<MultiResponse> existingResponses = responseDto.getResponse().get(alcoholRange);
            boolean nameAlreadyExists = existingResponses.stream()
                    .anyMatch(response -> response.getName().equals(name));

            if (!nameAlreadyExists) {
                existingResponses.add(regularRecipeDto);
            }
        }
        return responseDto;
    }
    // 도수별로 지정해주는 메서드
    private static String getAlcoholRange(Integer alcoholContent) {
        if (alcoholContent == 0) {
            return "무알콜";
        } else if (alcoholContent >= 1 && alcoholContent <= 9) {
            return "알코올 1단계 [1~9]도";
        } else if (alcoholContent >= 10 && alcoholContent <= 19) {
            return "알코올 2단계 [10~19]도";
        } else if (alcoholContent >= 20 && alcoholContent <= 29) {
            return "알코올 3단계 [20~29]도";
        } else if (alcoholContent >= 30 && alcoholContent <= 39) {
            return "알코올 4단계 [30~39]도";
        } else {
            return "알코올 5단계 [40]도 이상";
        }
    }
}
