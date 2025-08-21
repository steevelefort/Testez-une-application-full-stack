package com.openclassrooms.starterjwt.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;

import static org.mockito.Mockito.when;

@SpringBootTest
@DisplayName("SessionMapper - Tests")
public class SessionMapperTest {

  @Autowired
  private SessionMapper sessionMapper;

  @MockBean
  private TeacherService teacherService;

  @MockBean
  private UserService userService;

  @Test
  void toEntity_shouldReturnNull_whenInpusAreNull() {
    assertThat(sessionMapper.toEntity((SessionDto) null)).isNull();
    assertThat(sessionMapper.toEntity((List<SessionDto>) null)).isNull();
  }

  @Test
  void toDto_shouldReturnNull_whenSessionIsNull() {
    assertThat(sessionMapper.toDto((Session) null)).isNull();
    assertThat(sessionMapper.toDto((List<Session>) null)).isNull();
  }

  @Test
  void toEntity_shouldHandleNullTeacherId() {
    SessionDto dto = new SessionDto();
    dto.setTeacher_id(null);
    Session result = sessionMapper.toEntity(dto);
    assertThat(result.getTeacher()).isNull();
  }

  @Test
  void toEntity_shouldProcessNonEmptyList() {
    List<SessionDto> dtoList = Arrays.asList(new SessionDto());
    List<Session> result = sessionMapper.toEntity(dtoList);
    assertThat(result).hasSize(1);
  }


  @Test
  void toEntity_shouldHandleUsersWithNullUser() {
    SessionDto dto = new SessionDto();
    dto.setUsers(Arrays.asList(-1000L));
    when(userService.findById(-1000L)).thenReturn(null);

    Session result = sessionMapper.toEntity(dto);
  }

  @Test
  void toDto_shouldHandleAllNullCases_inSessionTeacherId() {
    Session sessionWithNullTeacher = new Session();
    sessionWithNullTeacher.setId(1L);
    sessionWithNullTeacher.setTeacher(null); 

    SessionDto result2 = sessionMapper.toDto(sessionWithNullTeacher);
    assertThat(result2.getTeacher_id()).isNull();

    Session sessionWithTeacherIdNull = new Session();
    Teacher teacherWithNullId = new Teacher();
    teacherWithNullId.setId(null); 
    sessionWithTeacherIdNull.setTeacher(teacherWithNullId);

    SessionDto result3 = sessionMapper.toDto(sessionWithTeacherIdNull);
    assertThat(result3.getTeacher_id()).isNull();
  }
}
