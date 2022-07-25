package com.ssafy.sharemind.config;

import com.ssafy.sharemind.common.auth.OAuth2AuthenticationSuccessHandler;
import com.ssafy.sharemind.common.auth.OAuth2LogoutSuccessHandler;
import com.ssafy.sharemind.common.auth.UserOAuth2Service;
import com.ssafy.sharemind.common.util.JwtAccessDeniedHandler;
import com.ssafy.sharemind.common.util.JwtAuthenticationEntryPoint;
import com.ssafy.sharemind.common.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    private final UserOAuth2Service userOAuth2Service;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2LogoutSuccessHandler oAuth2LogoutSuccessHandler;

    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v2 */
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            /* custom oauth api */
            "/oauth2/authorization/kakao",
            "/test",
            "/health_check",
            "/logout",
            "/token/reissuance/*"
    };

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().configurationSource(request -> {
            CorsConfiguration cors = new CorsConfiguration();
            cors.setAllowedOrigins(Collections.singletonList("*"));
            cors.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            cors.setAllowedHeaders(Collections.singletonList("*"));
            return cors;
        });

        httpSecurity.csrf().disable() // token 을 사용하는 방식이기 때문에 csrf를 disable합니다.

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않기 때문에 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // HttpServletRequest를 사용하는 요청들에 대한 접근제한을 설정하겠다는 의미
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers(PERMIT_URL_ARRAY).permitAll()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                .anyRequest().authenticated()  // 나머지 요청들은 인증 필요

                .and()
                .apply(new JwtSecurityConfig(tokenProvider))

                // 로그아웃 설정
                .and()
                .logout()
                .logoutSuccessUrl("/logout-success")
                .logoutSuccessHandler(oAuth2LogoutSuccessHandler)

                // oauth 로그인 설정
                .and()
                .oauth2Login()
                .defaultSuccessUrl("/login-success")
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .userInfoEndpoint().userService(userOAuth2Service);
    }
}