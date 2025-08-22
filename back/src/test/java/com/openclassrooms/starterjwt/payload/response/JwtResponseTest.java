package com.openclassrooms.starterjwt.payload.response;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("JwtResponse - Tests")
public class JwtResponseTest {

  @Test
  void setters_shouldUpdateAllFields_whenValidValues() {
    JwtResponse jwtResponse = new JwtResponse("accessToken", 1L, "SteeveLefort", "Steeve", "Lefort", true);

    jwtResponse.setToken("newToken");
    jwtResponse.setId(2L);
    jwtResponse.setUsername("newUserName");
    jwtResponse.setFirstName("newFirstName");
    jwtResponse.setLastName("newLastName");
    jwtResponse.setAdmin(false);

    assertThat(jwtResponse.getToken()).isEqualTo("newToken");
    assertThat(jwtResponse.getId()).isEqualTo(2L);
    assertThat(jwtResponse.getUsername()).isEqualTo("newUserName");
    assertThat(jwtResponse.getFirstName()).isEqualTo("newFirstName");
    assertThat(jwtResponse.getLastName()).isEqualTo("newLastName");
    assertThat(jwtResponse.getAdmin()).isFalse();
  }

  @Test
  void setType_shouldUpdateType() {
    JwtResponse jwtResponse = new JwtResponse("accessToken", 1L, "SteeveLefort", "Steeve", "Lefort", true);

    jwtResponse.setType("CustomType");

    assertThat(jwtResponse.getType()).isEqualTo("CustomType");
  }

}
