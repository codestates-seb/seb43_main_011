package com.BE.cocktail.persistence.domain.member;

import lombok.Getter;

public enum Role {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    @Getter
    private String role;

    Role(String role) {
        this.role = role;
    }
}
