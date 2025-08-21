package com.openclassrooms.starterjwt.models;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

public class TeacherTest {

  @Test
  void equals_shouldReturnTrue_whenCompareTheSameTeacher() {

    Teacher teacher = new Teacher();
    teacher.setId(1L);

    Teacher teacher2 = new Teacher();
    teacher2.setId(1L);

    assertThat(teacher.equals(teacher)).isTrue();
    assertThat(teacher.equals(teacher2)).isTrue();

  }

  @Test
  void equals_shouldReturnFalse_whenCompareDifferentTeachers() {

    Teacher teacher = new Teacher();
    teacher.setId(1L);

    Teacher teacher2 = new Teacher();
    teacher2.setId(2L);

    assertThat(teacher.equals(teacher2)).isFalse();

  }

  @Test
  void equals_shouldReturnFalse_whenCompareATeacherToDifferentClasses() {

    Teacher teacher = new Teacher();
    teacher.setId(1L);

    assertThat(teacher.equals(null)).isFalse();
    assertThat(teacher.equals("not a teacher")).isFalse();

  }

  @Test
  void equals_shouldReturnTrue_whenBothIdsAreNull() {
    Teacher teacher1 = new Teacher();
    Teacher teacher2 = new Teacher();
    assertThat(teacher1.equals(teacher2)).isTrue();
  }

  @Test
  void equals_shouldReturnFalse_whenOneIdIsNullAndOtherNot() {
    Teacher teacher1 = new Teacher();
    Teacher teacher2 = new Teacher();
    teacher2.setId(1L);
    assertThat(teacher1.equals(teacher2)).isFalse();
    assertThat(teacher2.equals(teacher1)).isFalse();
  }

  @Test
  void hashCode_shouldGenerateTheSameValue_whenIdsAreTheSame() {

    Teacher teacher = new Teacher();
    teacher.setId(1L);

    Teacher teacher2 = new Teacher();
    teacher2.setId(1L);

    assertThat(teacher.hashCode()).isEqualTo(teacher2.hashCode());

  }

  @Test
  void hashCode_shouldWork_whenIdIsNull() {

    Teacher teacher = new Teacher();

    assertThat(teacher.hashCode()).isNotNegative();
    assertThat(teacher.hashCode()).isInstanceOf(Integer.class);

  }

  @Test
  void setTimeStamps_shouldModifyThem_whenValidDateTime() {

    LocalDateTime now = LocalDateTime.now();
    Teacher teacher = new Teacher();
    teacher.setCreatedAt(now);
    teacher.setUpdatedAt(now);

    assertThat(teacher.getCreatedAt()).isEqualTo(now);
    assertThat(teacher.getUpdatedAt()).isEqualTo(now);

  }

}
