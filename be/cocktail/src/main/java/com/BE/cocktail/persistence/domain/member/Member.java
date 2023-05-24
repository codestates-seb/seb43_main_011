package com.BE.cocktail.persistence.domain.member;

import com.BE.cocktail.dto.member.MemberUpdateDto;
import com.BE.cocktail.dto.member.SignUpDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl = "https://cocktails3bucket.s3.ap-northeast-2.amazonaws.com/images/%EA%B8%B0%EB%B3%B8%ED%94%84%EC%82%AC.png";

    @Column(nullable = false, unique = true, length = 30)
    private String nickname;

    private String statusMessage;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column(nullable = false)
    private boolean deleted;


    private Member(String nickname, String email, String password, List<String> roles) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public static Member of(SignUpDto sign, String password, List<String> roles) {

        Member member = new Member(sign.getNickName(), sign.getEmail(), password, roles);

        return member;
    }

    public void updateImage(String imageUrl) {
        this.imageUrl = imageUrl;
        this.modifiedAt = LocalDateTime.now();
    }

    public void updateContent(MemberUpdateDto updateDto) {

        if(updateDto.getNickname() != null) {
            this.nickname = updateDto.getNickname();
            this.modifiedAt = LocalDateTime.now();
        }

        if(updateDto.getStatusMessage() != null) {
            this.statusMessage = updateDto.getStatusMessage();
            this.modifiedAt = LocalDateTime.now();
        }
    }
}
