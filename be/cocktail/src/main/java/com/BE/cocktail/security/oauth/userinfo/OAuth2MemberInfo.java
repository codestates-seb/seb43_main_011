package com.BE.cocktail.security.oauth.userinfo;

import java.util.Map;

public abstract class OAuth2MemberInfo {
    protected Map<String, Object> attributes;

    public OAuth2MemberInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes(){
        return attributes;
    }

    public abstract String getProviderId();
    public abstract String getEmail();
    public abstract String getName();
}
