package com.ssafy.sharemind.common.auth;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.sharemind.common.exception.UserNotFoundException;
import com.ssafy.sharemind.common.util.TokenProvider;
import com.ssafy.sharemind.db.entity.Token;
import com.ssafy.sharemind.db.entity.User;
import com.ssafy.sharemind.db.repository.TokenRepository;
import com.ssafy.sharemind.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final Environment env;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

//        login 성공한 사용자
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        String email = (String) kakao_account.get("email");
        Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
        String nickname = (String) properties.get("nickname");
        String accessToken = tokenProvider.createAccessToken(email, nickname);
        String refreshToken = tokenProvider.createRefreshToken();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        Optional<Token> findToken = tokenRepository.findByUser(user);

        if (!findToken.isPresent()) {
            tokenRepository.save(
                    Token.builder()
                            .refreshToken(refreshToken)
                            .user(user)
                            .build()
            );
        } else {
            findToken.get().updateRefreshToken(refreshToken);
        }

        String url = makeRedirectUrl(accessToken, refreshToken);

        if (response.isCommitted()) {
            logger.debug("응답이 이미 커밋된 상태입니다. " + url + "로 리다이렉트하도록 바꿀 수 없습니다.");
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, url);
    }

    private String makeRedirectUrl(String accessToken, String refreshToken) {

        return UriComponentsBuilder.fromUriString(env.getProperty("front.url"))
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();
    }
}