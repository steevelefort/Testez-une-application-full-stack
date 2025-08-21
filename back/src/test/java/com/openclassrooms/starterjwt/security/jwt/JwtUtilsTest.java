package com.openclassrooms.starterjwt.security.jwt;

import static org.assertj.core.api.Assertions.assertThat;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;

@ExtendWith(MockitoExtension.class)
@DisplayName("JwtUtils - Tests")
public class JwtUtilsTest {

  private JwtUtils jwtUtils;

  @Mock
  private Authentication authentication;

  @Mock
  private UserDetailsImpl userDetails;

  @BeforeEach
  void setUp() {
    jwtUtils = new JwtUtils();
    // Needed to inject values. There is no config in test mode.
    ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "testSecretKey");
    ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 86400000);
  }

  @Test
  @DisplayName("Should return false when token is malformed")
  void validateJwtToken_shouldReturnFalse_whenTokenIsMalformed() {
    String malformedToken = "malformed.token.here";

    boolean result = jwtUtils.validateJwtToken(malformedToken);

    assertThat(result).isFalse();
  }

  @Test
  @DisplayName("Should return false when token is expired")
  void validateJwtToken_shouldReturnFalse_whenTokenIsExpired() {
    String expiredToken = Jwts.builder()
        .setSubject("testuser")
        .setIssuedAt(new Date(System.currentTimeMillis() - 1000000))
        .setExpiration(new Date(System.currentTimeMillis() - 500000)) // Far past
        .signWith(SignatureAlgorithm.HS512, "testSecretKey")
        .compact();

    boolean result = jwtUtils.validateJwtToken(expiredToken);

    assertThat(result).isFalse();
  }

  @Test
  @DisplayName("Should return false when token has invalid signature")
  void validateJwtToken_shouldReturnFalse_whenTokenHasInvalidSignature() {
    String invalidSignatureToken = Jwts.builder()
        .setSubject("testuser")
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(SignatureAlgorithm.HS512, "wrongSecretKey") // Wrong signature key
        .compact();

    boolean result = jwtUtils.validateJwtToken(invalidSignatureToken);

    assertThat(result).isFalse();
  }

  @Test
  @DisplayName("Should return false when token is null or empty")
  void validateJwtToken_shouldReturnFalse_whenTokenIsNullOrEmpty() {
    assertThat(jwtUtils.validateJwtToken(null)).isFalse();
    assertThat(jwtUtils.validateJwtToken("")).isFalse();
  }

  @Test
  @DisplayName("Should return true when token is valid")
  void validateJwtToken_shouldReturnTrue_whenTokenIsValid() {
    String validToken = Jwts.builder()
        .setSubject("testuser")
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(SignatureAlgorithm.HS512, "testSecretKey")
        .compact();

    boolean result = jwtUtils.validateJwtToken(validToken);

    assertThat(result).isTrue();
  }

  @Test
  @DisplayName("Should generate valid JWT token")
  void generateJwtToken_shouldGenerateValidToken_whenAuthenticationIsValid() {
    when(userDetails.getUsername()).thenReturn("steeve@lefort-software.fr");
    when(authentication.getPrincipal()).thenReturn(userDetails);

    String token = jwtUtils.generateJwtToken(authentication);

    assertThat(token).isNotNull();
    assertThat(token).isNotEmpty();
  }

  @Test
  @DisplayName("Should extract username from valid token")
  void getUserNameFromJwtToken_shouldReturnUsername_whenTokenIsValid() {
    String username = "steeve@lefort-software.fr";
    when(userDetails.getUsername()).thenReturn(username);
    when(authentication.getPrincipal()).thenReturn(userDetails);

    String token = jwtUtils.generateJwtToken(authentication);
    String extractedUsername = jwtUtils.getUserNameFromJwtToken(token);

    assertThat(extractedUsername).isEqualTo(username);
  }
}
