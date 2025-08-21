package com.openclassrooms.starterjwt.security.services;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("UserDetailsImpl - Tests")
public class UserDetailsImplTest {

  @Test
  void builder_shouldCreateUserDetailsImplWithAllFields() {
    UserDetailsImpl userDetails = UserDetailsImpl.builder()
        .id(1L)
        .username("steeve@lefort-software.fr")
        .firstName("Steeve")
        .lastName("Lefort")
        .admin(false)
        .password("Test123!")
        .build();

    assertThat(userDetails.getId()).isEqualTo(1L);
    assertThat(userDetails.getUsername()).isEqualTo("steeve@lefort-software.fr");
    assertThat(userDetails.getFirstName()).isEqualTo("Steeve");
    assertThat(userDetails.getLastName()).isEqualTo("Lefort");
    assertThat(userDetails.getAdmin()).isEqualTo(false);
    assertThat(userDetails.getPassword()).isEqualTo("Test123!");
  }

  @Test
  void getAuthorities_shouldReturnEmptyCollection() {
    UserDetailsImpl userDetails = UserDetailsImpl.builder().build();

    assertThat(userDetails.getAuthorities()).isEmpty();
  }

  @Test
  void accountStatusMethods_shouldReturnTrueForAllMethods() {
    UserDetailsImpl userDetails = UserDetailsImpl.builder().build();

    assertThat(userDetails.isAccountNonExpired()).isTrue();
    assertThat(userDetails.isAccountNonLocked()).isTrue();
    assertThat(userDetails.isCredentialsNonExpired()).isTrue();
    assertThat(userDetails.isEnabled()).isTrue();
  }

  @Test
  void equals_shouldReturnTrueWithSameId() {
    UserDetailsImpl user1 = UserDetailsImpl.builder().id(1L).build();
    UserDetailsImpl user2 = UserDetailsImpl.builder().id(1L).build();

    assertThat(user1).isEqualTo(user2);
  }

  @Test
  void equals_shouldReturnFalseWithDifferentId() {
    UserDetailsImpl user1 = UserDetailsImpl.builder().id(1L).build();
    UserDetailsImpl user2 = UserDetailsImpl.builder().id(2L).build();

    assertThat(user1).isNotEqualTo(user2);
  }

  @Test
  void equals_shouldReturnFalseWithNull() {
    UserDetailsImpl user = UserDetailsImpl.builder().id(1L).build();

    assertThat(user).isNotEqualTo(null);
  }

  @Test
  void equals_shouldReturnFalseWithDifferentClass() {
    UserDetailsImpl user = UserDetailsImpl.builder().id(1L).build();

    assertThat(user).isNotEqualTo("not a UserDetailsImpl");
  }

  @Test
  void equals_shouldReturnTrueWithSameReference() {
    UserDetailsImpl user = UserDetailsImpl.builder().id(1L).build();

    assertThat(user).isEqualTo(user);
  }

  @Test
  void equals_shouldHandleNullIds() {
    UserDetailsImpl user1 = UserDetailsImpl.builder().id(null).build();
    UserDetailsImpl user2 = UserDetailsImpl.builder().id(null).build();
    UserDetailsImpl user3 = UserDetailsImpl.builder().id(1L).build();

    assertThat(user1).isEqualTo(user2);
    assertThat(user1).isNotEqualTo(user3);
  }
}
