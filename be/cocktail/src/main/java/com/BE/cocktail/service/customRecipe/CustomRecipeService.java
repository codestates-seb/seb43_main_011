package com.BE.cocktail.service.customRecipe;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.customRecipe.*;
import com.BE.cocktail.dto.customRecipe.createCustom.CustomRecipeIdResponseDto;
import com.BE.cocktail.dto.utils.MultiResponseDto;
import com.BE.cocktail.dto.utils.PageInfo;
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

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomRecipeService {

    private final CustomRecipeRepository customRecipeRepository;

    private final S3Uploader s3Uploader;

    private final MemberService memberService;
    //todo : 데이터가 삭제 된지 안된지 확인하는 로직 필요!!!!!!!!!!!!!!!!
//    public CustomRecipeResponseDto saveCustomRecipe(MultipartFile image, CustomRecipeCreateDto customRecipeCreateDto) throws IOException {
//        Long memberId = memberService.getLoginMember().getId();
//        String storedFileName = s3Uploader.upload(image,"images");
//        CustomRecipe customRecipe = CustomRecipe.of(customRecipeCreateDto, memberId, storedFileName);
//
//        customRecipeRepository.save(customRecipe);
//
//        return CustomRecipeResponseDto.of(customRecipe);
//    }


    public CustomRecipeResponseDto updateCustomRecipe(MultipartFile image, Long id, CustomUpdateDto customUpdateDto) throws IOException {


        CustomRecipe updateCustomRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);

        //게시글을 올린 본인이 맞는지 검사
        if(memberService.getLoginMember().getId() != updateCustomRecipe.getMemberId()) {
            throw new CocktailException(CocktailRtnConsts.ERR401);
        }

        if (image != null) {
            String storedFileName = s3Uploader.upload(image,"images");
            updateCustomRecipe.setImageUrl(storedFileName);
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

        customRecipeRepository.save(updateCustomRecipe);

        return CustomRecipeResponseDto.of(updateCustomRecipe);
    }

    public void deleteCustomRecipe(Long id) {
        CustomRecipe existingRecipe = customRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR403));

        if (existingRecipe.isDeleted()) {
            throw new CocktailException(CocktailRtnConsts.ERR404);
        }

        existingRecipe.setDeleted(true);
        existingRecipe.setModifiedAt(LocalDateTime.now());
        customRecipeRepository.save(existingRecipe);

        // 삭제가 성공적으로 이루어졌을 때는 성공 메시지를 반환
        throw new CocktailException(CocktailRtnConsts.SCC203);
    }


    public MultiResponseDto<CustomRecipeResponseDto> findCustoms(int page, int size) {

        Page<CustomRecipe> pages = customRecipeRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
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

        return CustomRecipeGetResponseDto.of(customRecipe);

    }

    public MultiResponseDto<CustomRecipeResponseDto> findMyRecipe(int page, int size) {
        Long memberId = memberService.getLoginMember().getId();

        Page<CustomRecipe> pages = customRecipeRepository.findByMemberId(memberId, PageRequest.of(page, size, Sort.by("id").descending()));
        List<CustomRecipe> customRecipes = pages.getContent();

        return MultiResponseDto.of(CustomRecipeResponseDtoList.of(customRecipes).getData(), PageInfo.of(pages));
    }

    public CustomRecipeIdResponseDto saveContentCustomRecipe(CustomRecipeCreateDto customRecipeCreateDto) {
        Long memberId = memberService.getLoginMember().getId();

        CustomRecipe customRecipe = CustomRecipe.of(customRecipeCreateDto, memberId);

        customRecipeRepository.save(customRecipe);

        return CustomRecipeIdResponseDto.of(customRecipe.getId());
    }

    @Transactional
    public void saveImageCustomRecipe(MultipartFile image, Long recipeId) throws IOException {

        String storedFileName = s3Uploader.upload(image,"images");

        CustomRecipe customRecipe = customRecipeRepository.findById(recipeId)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR401));

        customRecipe.insertImageUrl(storedFileName);
    }
}
