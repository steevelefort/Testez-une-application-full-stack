package com.openclassrooms.starterjwt.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.helpers.TestDataGenerator;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("TeacherService - Tests")
public class TeacherServiceTest {

  @Mock
  TeacherRepository teacherRepository;

  @InjectMocks
  TeacherService teacherService;

  @Test
  @DisplayName("Should return a list of teacher")
  void findAll_shouldReturnAListOfTeacher() {
    List<Teacher> expectedTeachers = TestDataGenerator.generateTeacherList(3);
    when(teacherRepository.findAll()).thenReturn(expectedTeachers);

    List<Teacher> result = teacherService.findAll();

    assertThat(result).containsExactlyElementsOf(expectedTeachers);
    verify(teacherRepository).findAll();
  }

  @Test
  @DisplayName("Should return a teacher when teacher exists")
  void findById_shouldReturnATeacher_whenTeacherExists() {
    Long teacherId = 1L;
    Teacher expectedTeacher = TestDataGenerator.generateTeacher(teacherId);
    when(teacherRepository.findById(teacherId)).thenReturn(Optional.of(expectedTeacher));

    Teacher result = teacherService.findById(teacherId);

    assertThat(result).isEqualTo(expectedTeacher);
    verify(teacherRepository).findById(teacherId);
  }

  @Test
  @DisplayName("Should return null when teacher does not exist")
  void findById_shouldReturnNull_whenTeacherDoesNotExist() {
    Long teacherId = 1L;
    when(teacherRepository.findById(teacherId)).thenReturn(Optional.empty());

    Teacher result = teacherService.findById(teacherId);

    assertThat(result).isNull();
    verify(teacherRepository).findById(teacherId);
  }

}
