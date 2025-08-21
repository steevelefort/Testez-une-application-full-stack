package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.helpers.TestDataGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@Rollback
class TeacherControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  TeacherRepository teacherRepository;

  @Test
  @WithMockUser
  void getApiTeacher_ValidId_ReturnsOkAndUserData() throws Exception {
    // Generate and save a user in the database
    Teacher testTeacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(testTeacher);

    MvcResult result = mockMvc.perform(get("/api/teacher/{id}", savedTeacher.getId()))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String responseContent = result.getResponse().getContentAsString();
    assertThat(responseContent).contains(savedTeacher.getFirstName());
    assertThat(responseContent).contains(savedTeacher.getLastName());
  }

  @Test
  @WithMockUser
  void getApiTeacher_NonValidId_ReturnsBadRequest() throws Exception {
    String teacherId = "xx";

    mockMvc.perform(get("/api/teacher/{id}", teacherId))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void getApiTeacher_NonExistingId_ReturnsNotFound() throws Exception {
    String notExistingTeacherId = "-1000";

    mockMvc.perform(get("/api/teacher/{id}", notExistingTeacherId))

        .andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser
  void getApiTeacher_WhithoutId_ReturnsOkWithAListOfTeachers() throws Exception {
    Teacher teacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(teacher);

    MvcResult result = mockMvc.perform(get("/api/teacher"))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String response = result.getResponse().getContentAsString();
    assertThat(response).contains(teacher.getFirstName());
    assertThat(response).contains(teacher.getLastName());
  }

}
