package com.openclassrooms.starterjwt.payload.request;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("SignupRequest - Tests")
public class SignupRequestTest {

  @Test
  void equals_shouldReturnTrue_whenCompareTheSameSignupRequest() {
    SignupRequest signupRequest = new SignupRequest();
    signupRequest.setEmail("test@test.com");
    signupRequest.setFirstName("John");
    signupRequest.setLastName("Doe");
    signupRequest.setPassword("password123");
    SignupRequest signupRequest2 = new SignupRequest();
    signupRequest2.setEmail("test@test.com");
    signupRequest2.setFirstName("John");
    signupRequest2.setLastName("Doe");
    signupRequest2.setPassword("password123");

    assertThat(signupRequest.equals(signupRequest)).isTrue();
    assertThat(signupRequest.equals(signupRequest2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenCompareDifferentSignupRequests() {
    SignupRequest signupRequest = new SignupRequest();
    signupRequest.setEmail("test@test.com");
    signupRequest.setFirstName("John");
    signupRequest.setLastName("Doe");
    signupRequest.setPassword("password123");
    SignupRequest signupRequest2 = new SignupRequest();
    signupRequest2.setEmail("different@test.com");
    signupRequest2.setFirstName("Jane");
    signupRequest2.setLastName("Smith");
    signupRequest2.setPassword("differentpassword");

    assertThat(signupRequest.equals(signupRequest2)).isFalse();
  }

  @Test
  void equals_shouldReturnFalse_whenCompareASignupRequestToDifferentClasses() {
    SignupRequest signupRequest = new SignupRequest();
    signupRequest.setEmail("test@test.com");

    assertThat(signupRequest.equals(null)).isFalse();
    assertThat(signupRequest.equals("not a signup request")).isFalse();
  }

  @Test
  void equals_shouldReturnTrue_whenBothFieldsAreNull() {
    SignupRequest signupRequest1 = new SignupRequest();
    SignupRequest signupRequest2 = new SignupRequest();

    assertThat(signupRequest1.equals(signupRequest2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenOneFieldIsNullAndOtherNot() {
    SignupRequest signupRequest1 = new SignupRequest();
    SignupRequest signupRequest2 = new SignupRequest();

    signupRequest2.setEmail("test@test.com");

    assertThat(signupRequest1.equals(signupRequest2)).isFalse();
    assertThat(signupRequest2.equals(signupRequest1)).isFalse();
  }

  @Test
  void hashCode_shouldGenerateTheSameValue_whenFieldsAreTheSame() {
    SignupRequest signupRequest = new SignupRequest();
    signupRequest.setEmail("test@test.com");
    signupRequest.setFirstName("John");
    signupRequest.setLastName("Doe");
    signupRequest.setPassword("password123");
    SignupRequest signupRequest2 = new SignupRequest();
    signupRequest2.setEmail("test@test.com");
    signupRequest2.setFirstName("John");
    signupRequest2.setLastName("Doe");
    signupRequest2.setPassword("password123");

    assertThat(signupRequest.hashCode()).isEqualTo(signupRequest2.hashCode());
  }

  @Test
  void hashCode_shouldWork_whenFieldsAreNull() {
    SignupRequest signupRequest = new SignupRequest();

    assertThat(signupRequest.hashCode()).isNotNegative();
    assertThat(signupRequest.hashCode()).isInstanceOf(Integer.class);
  }

  @Test
  void setFields_shouldModifyThem_whenValidData() {
    SignupRequest signupRequest = new SignupRequest();
    signupRequest.setEmail("test@test.com");
    signupRequest.setFirstName("John");
    signupRequest.setLastName("Doe");
    signupRequest.setPassword("password123");

    assertThat(signupRequest.getEmail()).isEqualTo("test@test.com");
    assertThat(signupRequest.getFirstName()).isEqualTo("John");
    assertThat(signupRequest.getLastName()).isEqualTo("Doe");
    assertThat(signupRequest.getPassword()).isEqualTo("password123");
  }

}
