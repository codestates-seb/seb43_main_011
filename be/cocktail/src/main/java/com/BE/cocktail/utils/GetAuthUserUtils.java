package com.BE.cocktail.utils;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.exception.CocktailException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class GetAuthUserUtils {
    public static Authentication getAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")){
            throw new CocktailException(CocktailRtnConsts.ERR401);
        }
        authentication.getPrincipal();
        return authentication;
    }
}
