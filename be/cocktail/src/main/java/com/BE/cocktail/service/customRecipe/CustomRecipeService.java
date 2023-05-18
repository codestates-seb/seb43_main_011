package com.BE.cocktail.service.customRecipe;

import com.BE.cocktail.dto.apiResponse.CocktailRtnConsts;
import com.BE.cocktail.dto.customRecipe.*;
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

    public CustomRecipeResponseDto saveCustomRecipe(MultipartFile image, CustomRecipePostDto customRecipePostDto) throws IOException {

        Long memberId = memberService.getLoginMember().getId();
        String storedFileName = s3Uploader.upload(image,"images");
        CustomRecipe customRecipe = CustomRecipe.of(customRecipePostDto, memberId, storedFileName);

        customRecipeRepository.save(customRecipe);

        return CustomRecipeResponseDto.of(customRecipe);
    }


    public CustomRecipeResponseDtoList findCustomRecipeList() {
        List<CustomRecipe> customRecipeList = customRecipeRepository.findByDeletedFalse();
        return CustomRecipeResponseDtoList.of(customRecipeList);
    }


    public CustomRecipeResponseDto updateCustomRecipe(Long id, CustomPatchDto customPatchDto) {


        CustomRecipe updateCustomRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);

        //게시글을 올린 본인이 맞는지 검사
        if(memberService.getLoginMember().getId() != updateCustomRecipe.getMemberId()) {
            throw new CocktailException(CocktailRtnConsts.ERR401);
        }


        if (customPatchDto.getName() != null) {
            updateCustomRecipe.setName(customPatchDto.getName());
        }
        if (customPatchDto.getDescription() != null) {
            updateCustomRecipe.setDescription(customPatchDto.getDescription());
        }
        if (customPatchDto.getRecipe() != null) {
            updateCustomRecipe.setRecipe(customPatchDto.getRecipe());
        }
        if (customPatchDto.getIngredient() != null) {
            updateCustomRecipe.setIngredient(customPatchDto.getIngredient());
        }

        updateCustomRecipe.setModifiedAt(LocalDateTime.now());

        customRecipeRepository.save(updateCustomRecipe);

        return CustomRecipeResponseDto.of(updateCustomRecipe);
    }


//    public void deleteCustomRecipe(Long id) {
//        CustomRecipe existingRecipe = customRecipeRepository.findById(id).orElseThrow(IllegalArgumentException::new);
//        existingRecipe.setDeleted(true);
//        customRecipeRepository.save(existingRecipe);
//    }

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


    public MultiResponseDto<CustomRecipeResponseDto> paging(int page, int size) {

        Page<CustomRecipe> pages = customRecipeRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        List<CustomRecipe> customRecipes = pages.getContent();

        return MultiResponseDto.of(CustomRecipeResponseDtoList.of(customRecipes).getCustomRecipeResponseDtoList(), PageInfo.of(pages));
    }

    public MultiResponseDto<CustomSearchResponseDto> searchPaging(String keyword, int page, int size) {
        Page<CustomRecipe> pages = customRecipeRepository.findAllByKeyword(keyword, PageRequest.of(page, size, Sort.by("id").descending()));
        List<CustomRecipe> customRecipes = pages.getContent();

        return MultiResponseDto.of(CustomSearchResponseDto.listOf(customRecipes), PageInfo.of(pages));
    }

    public CustomRecipeGetResponseDto find(Long id) {
        CustomRecipe customRecipe = customRecipeRepository.findById(id)
                .orElseThrow(() -> new CocktailException(CocktailRtnConsts.ERR405));

        return CustomRecipeGetResponseDto.of(customRecipe);

    }
}
