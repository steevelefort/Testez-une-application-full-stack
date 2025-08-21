package com.openclassrooms.starterjwt.models;

import static org.assertj.core.api.Assertions.assertThat;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

public class SessionTest {

  @Test
  void equals_shouldReturnTrue_whenCompareTheSameSession() {
    Session session = new Session();
    session.setId(1L);
    Session session2 = new Session();
    session2.setId(1L);
    assertThat(session.equals(session)).isTrue();
    assertThat(session.equals(session2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenCompareDifferentSessions() {
    Session session = new Session();
    session.setId(1L);
    Session session2 = new Session();
    session2.setId(2L);
    assertThat(session.equals(session2)).isFalse();
  }

  @Test
  void equals_shouldReturnFalse_whenCompareASessionToDifferentClasses() {
    Session session = new Session();
    session.setId(1L);
    assertThat(session.equals(null)).isFalse();
    assertThat(session.equals("not a session")).isFalse();
  }

  @Test
  void equals_shouldReturnTrue_whenBothIdsAreNull() {
    Session session1 = new Session();
    Session session2 = new Session();
    assertThat(session1.equals(session2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenOneIdIsNullAndOtherNot() {
    Session session1 = new Session();
    Session session2 = new Session();
    session2.setId(1L);
    assertThat(session1.equals(session2)).isFalse();
    assertThat(session2.equals(session1)).isFalse();
  }

  @Test
  void hashCode_shouldGenerateTheSameValue_whenIdsAreTheSame() {
    Session session = new Session();
    session.setId(1L);
    Session session2 = new Session();
    session2.setId(1L);
    assertThat(session.hashCode()).isEqualTo(session2.hashCode());
  }

  @Test
  void hashCode_shouldWork_whenIdIsNull() {
    Session session = new Session();
    assertThat(session.hashCode()).isNotNegative();
    assertThat(session.hashCode()).isInstanceOf(Integer.class);
  }

  @Test
  void setTimeStamps_shouldModifyThem_whenValidDateTime() {
    LocalDateTime now = LocalDateTime.now();
    Session session = new Session();
    session.setCreatedAt(now);
    session.setUpdatedAt(now);
    assertThat(session.getCreatedAt()).isEqualTo(now);
    assertThat(session.getUpdatedAt()).isEqualTo(now);
  }
}
