package com.openclassrooms.starterjwt.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.helpers.TestDataGenerator;
import com.openclassrooms.starterjwt.models.Teacher;

@SpringBootTest
@DisplayName("TeacherMapper - Tests")
public class TeacherMapperTest {

  @Autowired
  TeacherMapper teacherMapper;

  @Test
  void toEntity_shouldReturnNull_withNullEntry() {
    assertThat(teacherMapper.toEntity((TeacherDto)null)).isNull();
    assertThat(teacherMapper.toEntity((List<TeacherDto>)null)).isNull();
  } 

  @Test
  void toDto_shouldReturnNull_withNullEntry() {
    assertThat(teacherMapper.toDto((Teacher)null)).isNull();
    assertThat(teacherMapper.toDto((List<Teacher>)null)).isNull();
  }

  @Test
  void toEntity_shouldReturnAValidEntity_withValidData() {

    TeacherDto teacherDto = new TeacherDto();
    teacherDto.setId(1L);
    teacherDto.setLastName("Doe");
    teacherDto.setFirstName("John");

    Teacher teacher = teacherMapper.toEntity(teacherDto);

    assertThat(teacher.getLastName()).isEqualTo("Doe");
    assertThat(teacher.getFirstName()).isEqualTo("John");
  }

  @Test
  void toDto_shouldReturnAValidDto_withValidData() {
    Teacher teacher = TestDataGenerator.generateTeacher(1L);
    TeacherDto teacherDto = teacherMapper.toDto(teacher);

    assertThat(teacherDto.getFirstName()).isEqualTo(teacher.getFirstName());
    assertThat(teacherDto.getLastName()).isEqualTo(teacher.getLastName());
  }

  @Test
  void toEntity_shouldReturnAListOfEntities_withValidDtos() {
    ArrayList<TeacherDto> teacherDtos = new ArrayList<>();
    TeacherDto teacherDto1 = new TeacherDto();
    teacherDto1.setFirstName("John");
    teacherDto1.setLastName("Doe");
    teacherDto1.setId(1L);
    teacherDtos.add(teacherDto1);
    TeacherDto teacherDto2 = new TeacherDto();
    teacherDto2.setFirstName("John2");
    teacherDto2.setLastName("Doe2");
    teacherDto2.setId(2L);
    teacherDtos.add(teacherDto2);

    List<Teacher> teachers = teacherMapper.toEntity(teacherDtos);

    assertThat(teachers.get(0).getId()).isEqualTo(teacherDto1.getId());
    assertThat(teachers.get(0).getFirstName()).isEqualTo(teacherDto1.getFirstName());
    assertThat(teachers.get(0).getLastName()).isEqualTo(teacherDto1.getLastName());

    assertThat(teachers.get(1).getId()).isEqualTo(teacherDto2.getId());
    assertThat(teachers.get(1).getFirstName()).isEqualTo(teacherDto2.getFirstName());
    assertThat(teachers.get(1).getLastName()).isEqualTo(teacherDto2.getLastName());
  }

}



