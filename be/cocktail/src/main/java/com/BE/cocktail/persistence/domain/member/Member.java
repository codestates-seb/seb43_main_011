package com.BE.cocktail.persistence.domain.member;

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

//    @Column(nullable = false)
    private String imageUrl;

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

    private String provider;
    private String providerId;

//    public static Member of(SignUpDto sign, String encryptedPassword, List<String> roles) {
//    }

    public void addRoles(List<String> roles) {
        this.roles = roles;
    }

//    private Member(String nickname, String email, String password, List<String> roles) {
//        this.nickname = nickname;
//        this.email = email;
//        this.password = password;
//        this.roles = roles;
//    }

    @Builder
    private Member(String nickname, String email, String password, List<String> roles, String provider, String providerId) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.provider = provider;
        this.providerId = providerId;
    }

    public static Member of(SignUpDto sign, String password, List<String> roles, String provider, String providerId) {

        Member member = new Member(sign.getNickName(), sign.getEmail(), password, roles, provider, providerId);

        return member;

    }
}
