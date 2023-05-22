package com.BE.cocktail.service.customRecipe;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.customRecipe.*;
import com.BE.cocktail.dto.regularRecipe.RegularRecipeGetResponseDto;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.dto.utils.PageInfo;
import com.BE.cocktail.persistence.domain.bookmark.Bookmark;
import com.BE.cocktail.persistence.domain.customRecipe.CustomRecipe;
import com.BE.cocktail.persistence.repository.customRecipe.CustomRecipeRepository;
import com.BE.cocktail.exception.CocktailException;
import com.BE.cocktail.s3.service.S3Uploader;
import com.BE.cocktail.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.CharConversionException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomRecipeService {

    private final CustomRecipeRepository customRecipeRepository;

    private final S3Uploader s3Uploader;

    private final MemberService memberService;


    @Transactional
    public CustomRecipeResponseDto updateCustomRecipe(Long id, CustomUpdateDto customUpdateDto) {


        CustomRecipe updateCustomRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);

        //게시글을 올린 본인이 맞는지 검사
        if(memberService.getLoginMember().getId() != updateCustomRecipe.getMemberId()) {
            throw new CocktailException(CocktailRtnConsts.ERR401);
        }

        if (customUpdateDto.getName() != null) {
            updateCustomRecipe.setName(customUpdateDto.getName());
        }
        if (customUpdateDto.getDescription() != null) {
            updateCustomRecipe.setDescription(customUpdateDto.getDescription());
        }
        if (customUpdateDto.getRecipe() != null) {
            updateCustomRecipe.setRecipe(customUpdateDto.getRecipe());
        }
        if (customUpdateDto.getIngredient() != null) {
            updateCustomRecipe.setIngredient(customUpdateDto.getIngredient());
        }

        updateCustomRecipe.setModifiedAt(LocalDateTime.now());

        return CustomRecipeResponseDto.of(updateCustomRecipe);
    }

    @Transactional
    public void deleteCustomRecipe(Long id) {
        CustomRecipe existingRecipe = customRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR403));

        if (existingRecipe.isDeleted()) {
            throw new CocktailException(CocktailRtnConsts.ERR404);
        }

        existingRecipe.setDeleted(true);
        existingRecipe.setModifiedAt(LocalDateTime.now());

    }


    public MultiResponseDto<CustomRecipeResponseDto> findCustoms(int page, int size) {

        Page<CustomRecipe> pages = customRecipeRepository.findAllByDeletedFalse(PageRequest.of(page, size, Sort.by("id").descending()));
        List<CustomRecipe> customRecipes = pages.getContent();

        return MultiResponseDto.of(CustomRecipeResponseDtoList.of(customRecipes).getData(), PageInfo.of(pages));
    }

    public MultiResponseDto<CustomSearchResponseDto> searchRecipes(String keyword, int page, int size) {
        Page<CustomRecipe> pages = customRecipeRepository.findAllByKeyword(keyword, PageRequest.of(page, size, Sort.by("id").descending()));
        List<CustomRecipe> customRecipes = pages.getContent();

        return MultiResponseDto.of(CustomSearchResponseDto.listOf(customRecipes), PageInfo.of(pages));
    }

    public CustomRecipeGetResponseDto find(Long id) {

        CustomRecipe customRecipe = customRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR405));

        boolean checkMember = memberService.CheckMember();

        if (!checkMember) {
            return CustomRecipeGetResponseDto.of(customRecipe);
        }

        Long memberId = memberService.getLoginMember().getId();
        Optional<Bookmark> bookmark = customRecipeRepository.findBookmarkById(memberId, customRecipe.getId(), Bookmark.RecipeType.CUSTOM_RECIPE);

        boolean check = false;

        if(bookmark.isPresent()) check = true;

        return CustomRecipeGetResponseDto.bookmarkOf(customRecipe, check);
    }

    public CustomRecipeIdResponseDto saveContentCustomRecipe(CustomRecipeCreateDto customRecipeCreateDto) {
        Long memberId = memberService.getLoginMember().getId();

        CustomRecipe customRecipe = CustomRecipe.of(customRecipeCreateDto, memberId);

        customRecipeRepository.save(customRecipe);

        return CustomRecipeIdResponseDto.of(customRecipe.getId());
    }

    //커스텀 글 등록 이미지만
    @Transactional
    public void saveImageCustomRecipe(MultipartFile image, Long recipeId) throws IOException {

        String storedFileName = s3Uploader.upload(image,"images");


        CustomRecipe customRecipe = customRecipeRepository.findById(recipeId)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

        //게시글을 올린 본인이 맞는지 검사
        if(memberService.getLoginMember().getId() != customRecipe.getMemberId()) {
            throw new CocktailException(CocktailRtnConsts.ERR401);
        }

        if (customRecipe.isDeleted() != false) {
            throw new CocktailException(CocktailRtnConsts.ERR404);
        }

        customRecipe.insertImageUrl(storedFileName);
    }

    public MultiResponseDto<CustomRecipeResponseDto> findMyRecipe(int page, int size) {
        Long memberId = memberService.getLoginMember().getId();
        //todo : deleted 확인 로직

        Page<CustomRecipe> pages = customRecipeRepository.findByMemberId(memberId, PageRequest.of(page, size, Sort.by("id").descending()));
        List<CustomRecipe> customRecipes = pages.getContent();

        return MultiResponseDto.of(CustomRecipeResponseDtoList.of(customRecipes).getData(), PageInfo.of(pages));
    }

}
