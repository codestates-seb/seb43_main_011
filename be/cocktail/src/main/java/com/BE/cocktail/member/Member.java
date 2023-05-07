package com.BE.cocktail.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 30)
    private String nickname;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Lob
    private String statusMessage;
    @Lob
    private String imageUrl;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime modifiedAt;
    private LocalDateTime deletedAt;
}
