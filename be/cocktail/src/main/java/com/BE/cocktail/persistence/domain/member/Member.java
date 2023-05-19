package com.BE.cocktail.persistence.domain.member;

import com.BE.cocktail.dto.member.SignUpDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private Member(String nickname, String email, String password, List<String> roles, String imageUrl) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.imageUrl = imageUrl;
    }

    public static Member of(SignUpDto sign, String password, List<String> roles, String imageUrl) {

        Member member = new Member(sign.getNickName(), sign.getEmail(), password, roles, imageUrl);

        return member;

    }
}
