package com.ssafy.sharemind.common.util;

import com.ssafy.sharemind.common.exception.TokenNotFoundException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class TokenProvider implements InitializingBean {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final String secret;

    private final long accessTokenValidityInSeconds;

    private final long refreshTokenValidityInSeconds;

    private Key key;
    private final UserDetailsService userDetailsService;

    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-token-validity-in-seconds}") long accessTokenValidityInSeconds,
            @Value("${jwt.refresh-token-validity-in-seconds}") long refreshTokenValidityInSeconds,
            UserDetailsService userDetailsService) {
        this.secret = secret;
        this.accessTokenValidityInSeconds = accessTokenValidityInSeconds * 1000;
        this.refreshTokenValidityInSeconds = refreshTokenValidityInSeconds * 1000;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(String email, String nickname) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.accessTokenValidityInSeconds);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .claim("nickname", nickname)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public String createRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + this.refreshTokenValidityInSeconds);

        return Jwts.builder()
                .setIssuedAt(now)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    // 토큰으로 인증 객체를 얻기 위한 메서드
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getMemberEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    public String getMemberEmail(String token) {
        try {
            if (token == null || token.isEmpty()) {
                throw new TokenNotFoundException();
            }
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();

        } catch (TokenNotFoundException e) {
            throw new TokenNotFoundException();
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage());
        } catch (SignatureException e) {
            throw new SignatureException(e.getMessage());
        } catch (MalformedJwtException e) {
            throw new MalformedJwtException(e.getMessage());
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}