package com.openclassrooms.starterjwt.models;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

public class UserTest {

  @Test
  void constructor_shouldCreateUserWithRequiredFields() {
    User user = new User("test@example.com", "Doe", "John", "password123", false);

    assertThat(user.getEmail()).isEqualTo("test@example.com");
    assertThat(user.getLastName()).isEqualTo("Doe");
    assertThat(user.getFirstName()).isEqualTo("John");
    assertThat(user.getPassword()).isEqualTo("password123");
    assertThat(user.isAdmin()).isEqualTo(false);
  }

  @Test
  void constructor_shouldCreateUserWithBuilder() {
    // Builder Lombok
    User user = User.builder()
        .email("test@example.com")
        .lastName("Doe")
        .firstName("John")
        .password("password123")
        .admin(false)
        .build();

    assertThat(user.getEmail()).isEqualTo("test@example.com");
    assertThat(user.isAdmin()).isEqualTo(false);
  }

  @Test
  void toString_shouldReturnStringRepresentation() {
    User user = User.builder()
        .email("test@example.com")
        .lastName("Doe")
        .firstName("John")
        .password("password123")
        .admin(false)
        .build();

    String result = user.toString();

    assertThat(result).isNotNull();
    assertThat(result).contains("User");
  }

  @Test
  void equals_shouldReturnTrue_whenCompareTheSameUser() {
    User user = new User();
    User user2 = new User();

    user.setId(1L);
    user2.setId(1L);

    assertThat(user.equals(user)).isTrue();
    assertThat(user.equals(user2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenCompareDifferentUsers() {
    User user = new User();
    User user2 = new User();

    user.setId(1L);
    user2.setId(2L);

    assertThat(user.equals(user2)).isFalse();
  }

  @Test
  void equals_shouldReturnFalse_whenCompareAUserToDifferentClasses() {
    User user = new User();

    user.setId(1L);

    assertThat(user.equals(null)).isFalse();
    assertThat(user.equals("not a user")).isFalse();
  }

  @Test
  void equals_shouldReturnTrue_whenBothIdsAreNull() {
    User user1 = new User();
    User user2 = new User();

    assertThat(user1.equals(user2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenOneIdIsNullAndOtherNot() {
    User user1 = new User();
    User user2 = new User();

    user2.setId(1L);

    assertThat(user1.equals(user2)).isFalse();
    assertThat(user2.equals(user1)).isFalse();
  }

  @Test
  void hashCode_shouldGenerateTheSameValue_whenIdsAreTheSame() {
    User user = new User();
    User user2 = new User();

    user.setId(1L);
    user2.setId(1L);

    assertThat(user.hashCode()).isEqualTo(user2.hashCode());
  }

  @Test
  void hashCode_shouldWork_whenIdIsNull() {
    User user = new User();

    assertThat(user.hashCode()).isNotNegative();
    assertThat(user.hashCode()).isInstanceOf(Integer.class);
  }

  @Test
  void setTimeStamps_shouldModifyThem_whenValidDateTime() {
    LocalDateTime now = LocalDateTime.now();
    User user = new User();

    user.setCreatedAt(now);
    user.setUpdatedAt(now);

    assertThat(user.getCreatedAt()).isEqualTo(now);
    assertThat(user.getUpdatedAt()).isEqualTo(now);
  }

  @Test
  void builder_toString_shouldReturnDescription() {
    User.UserBuilder builder = User.builder().email("test@test.com");

    assertThat(builder.toString()).contains("UserBuilder");
  }

}
