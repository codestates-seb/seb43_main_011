package com.BE.cocktail.dto.regularRecipe;

import com.BE.cocktail.persistence.domain.regularRecipe.RegularRecipe;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Setter
@Getter
public class RegularRecipeResponses {

    private Map<String, List<RegularRecipeResponse>> response;

    public RegularRecipeResponses() {
        this.response = new TreeMap<>();
    }

    public static RegularRecipeResponses of(List<RegularRecipe> regularRecipes) {
        RegularRecipeResponses response = new RegularRecipeResponses();

        // 알콜 도수별 그룹화 및 중복된 이름 필터링
        for (RegularRecipe regularRecipe : regularRecipes) {
            String name = regularRecipe.getName();
            String alcoholRange = getAlcoholRange(regularRecipe.getAlcVol());
            RegularRecipeResponse regularRecipeDto = RegularRecipeResponse.of(regularRecipe);

            if (!response.getResponse().containsKey(alcoholRange)) {
                response.getResponse().put(alcoholRange, new ArrayList<>());
            }
            List<RegularRecipeResponse> existingResponses = response.getResponse().get(alcoholRange);
            boolean nameAlreadyExists = existingResponses.stream()
                    .anyMatch(responseDto -> responseDto.getName().equals(name));

            if (!nameAlreadyExists) {
                existingResponses.add(regularRecipeDto);
            }
        }
        return response;
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
