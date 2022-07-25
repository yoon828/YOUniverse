package com.ssafy.sharemind.common.auth;

import com.ssafy.sharemind.api.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    private final UserServiceImpl userService;

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication) throws IOException, ServletException {

        String authorization = request.getHeader("Authorization");

        userService.logout(authorization.replace("Bearer ", ""));

        if (response.isCommitted()) {
            logger.debug("응답이 이미 커밋된 상태입니다. " + "/logout-success" + "로 리다이렉트하도록 바꿀 수 없습니다.");
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, "/logout-success");
    }
}
