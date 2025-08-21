package com.openclassrooms.starterjwt.security.jwt;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyString;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthTokenFilter - Tests")
public class AuthTokenFilterTest {

  @Mock
  private JwtUtils jwtUtils;

  @Mock
  private UserDetailsServiceImpl userDetailsService;

  @Mock
  private HttpServletRequest request;

  @Mock
  private HttpServletResponse response;

  @Mock
  private FilterChain filterChain;

  @Mock
  private UserDetails userDetails;

  @Mock
  private Logger logger;

  @InjectMocks
  private AuthTokenFilter authTokenFilter;

  @Test
  void doFilterInternal_shouldSetAuthentication_whenValidToken() throws Exception {
    // given
    String token = "validToken";
    String username = "test@test.com";

    when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
    when(jwtUtils.validateJwtToken(token)).thenReturn(true);
    when(jwtUtils.getUserNameFromJwtToken(token)).thenReturn(username);
    when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);
    when(userDetails.getAuthorities()).thenReturn(Collections.emptyList());

    // when
    authTokenFilter.doFilterInternal(request, response, filterChain);

    // then
    verify(filterChain).doFilter(request, response);
  }

  @Test
  void doFilterInternal_shouldCalldoFilter_whenException() throws Exception {
    // given
    String token = "validToken";
    String username = "test@test.com";

    when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
    when(jwtUtils.validateJwtToken(token)).thenReturn(true);
    when(jwtUtils.getUserNameFromJwtToken(token)).thenReturn(username);
    when(userDetailsService.loadUserByUsername(username)).thenThrow(new UsernameNotFoundException("Not found"));

    authTokenFilter.doFilterInternal(request, response, filterChain);

    verify(filterChain).doFilter(request, response);
    verify(userDetailsService).loadUserByUsername(username);
  }

  @Test
  void doFilterInternal_shouldNotSetAuthentication_whenNoToken() throws Exception {
    // given
    when(request.getHeader("Authorization")).thenReturn(null);

    // when
    authTokenFilter.doFilterInternal(request, response, filterChain);

    // then
    verify(filterChain).doFilter(request, response);
    verify(jwtUtils, never()).validateJwtToken(any());
  }

  @Test
  void doFilterInternal_shouldNotSetAuthentication_whenInvalidToken() throws Exception {
    // given
    String token = "invalidToken";

    when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
    when(jwtUtils.validateJwtToken(token)).thenReturn(false);

    // when
    authTokenFilter.doFilterInternal(request, response, filterChain);

    // then
    verify(filterChain).doFilter(request, response);
    verify(userDetailsService, never()).loadUserByUsername(any());
  }
}
