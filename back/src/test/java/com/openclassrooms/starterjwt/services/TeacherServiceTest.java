package com.openclassrooms.starterjwt.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("TeacherService - Tests")
public class TeacherServiceTest {

  @Mock
  TeacherRepository teacherRepository;

  @InjectMocks
  TeacherService teacherService;

  /**
   * Generate a single fake teacher
   *
   * @param id id of the teacher
   * @return Teacher
   */
  private Teacher generateTeacher(Long id) {
    Teacher teacher = new Teacher();
    teacher.setId(id);
    teacher.setFirstName("teacher" + id);
    teacher.setLastName("teacher" + id);
    return teacher;
  }

  /**
   * Generate a list of fake teachers
   *
   * @return List<Teacher>
   */
  private List<Teacher> generateTeacherList(int quantity) {
    List<Teacher> teachers = new ArrayList<Teacher>();
    for (long i = 1L; i <= (long) quantity; i++) {
      Teacher teacher = generateTeacher(i);
      teachers.add(teacher);
    }
    return teachers;
  }

  @Test
  @DisplayName("Should return a list of teacher")
  void findAll_shouldReturnAListOfTeacher() {
    List<Teacher> expectedTeachers = generateTeacherList(3);
    when(teacherRepository.findAll()).thenReturn(expectedTeachers);

    List<Teacher> result = teacherService.findAll();

    assertThat(result).containsExactlyElementsOf(expectedTeachers);
    verify(teacherRepository).findAll();
  }

  @Test
  @DisplayName("Should return a teacher when teacher exists")
  void findById_shouldReturnATeacher_whenTeacherExists() {
    Long teacherId = 1L;
    Teacher expectedTeacher = generateTeacher(teacherId);
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
