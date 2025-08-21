package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@Rollback
class SessionControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  SessionRepository sessionRepository;

  @Autowired
  TeacherRepository teacherRepository;

  @Autowired
  UserRepository userRepository;

  @Test
  @WithMockUser
  void getApiSession_ValidId_ReturnsOkAndSessionData() throws Exception {
    // Generate and save a session in the database
    Session testSession = TestDataGenerator.generateSession();
    Session savedSession = sessionRepository.save(testSession);

    MvcResult result = mockMvc.perform(get("/api/session/{id}", savedSession.getId()))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String responseContent = result.getResponse().getContentAsString();
    assertThat(responseContent).contains(savedSession.getName());
    assertThat(responseContent).contains(savedSession.getDescription()); // si ce champ existe
  }

  @Test
  @WithMockUser
  void getApiSession_NotExistingId_ReturnsNotFound() throws Exception {
    String notExistingSessionId = "-1000";

    mockMvc.perform(get("/api/session/{id}", notExistingSessionId))

        .andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser
  void getApiSession_NotNumericId_ReturnsBadRequest() throws Exception {
    String notNumericSessionId = "xxxx";

    mockMvc.perform(get("/api/session/{id}", notNumericSessionId))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void getApiSession_WithoutId_ReturnsOkAndAnListOfSessions() throws Exception {
    // Generate and save a session in the database (to be sure to have at least one)
    Session testSession = TestDataGenerator.generateSession();
    Session savedSession = sessionRepository.save(testSession);

    MvcResult result = mockMvc.perform(get("/api/session"))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String responseContent = result.getResponse().getContentAsString();
    assertThat(responseContent).contains(savedSession.getName());
    assertThat(responseContent).contains(savedSession.getDescription());
  }

  @Test
  @WithMockUser
  void postApiSession_WithValidSessionData_ReturnsOkAndSessionData() throws Exception {

    Teacher teacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(teacher);

    String sessionName = "A session";
    String sessionDescription = "This is a description";
    String sessionDate = "2025-09-30";
    String sessionTeacherId = savedTeacher.getId().toString();
    String sessionRequest = "{\"name\":\"" + sessionName + "\",\"description\":\"" + sessionDescription
        + "\",\"date\":\"" + sessionDate + "\",\"teacher_id\":\"" + sessionTeacherId + "\"}";

    MvcResult result = mockMvc.perform(post("/api/session")
        .contentType(MediaType.APPLICATION_JSON)
        .content(sessionRequest))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String responseContent = result.getResponse().getContentAsString();
    assertThat(responseContent).contains(sessionName);
    assertThat(responseContent).contains(sessionDescription);
  }

  @Test
  @WithMockUser
  void putApiSession_WithValidIdAndSessionData_ReturnsOkAndSessionData() throws Exception {
    Teacher teacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(teacher);
    Session session = TestDataGenerator.generateSessionWithTeacher(teacher);
    Session savedSession = sessionRepository.save(session);
    String updatedSessionName = "An updated session";
    String updatedSessionDescription = "An updated description of";
    String updatedSessionDate = "2000-01-01";
    String sessionRequest = "{\"name\":\"" + updatedSessionName + "\",\"description\":\"" + updatedSessionDescription
        + "\",\"date\":\"" + updatedSessionDate + "\",\"teacher_id\":\"" + savedSession.getTeacher().getId() + "\"}";

    MvcResult result = mockMvc.perform(put("/api/session/{id}", savedSession.getId())
        .contentType(MediaType.APPLICATION_JSON)
        .content(sessionRequest))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String responseContent = result.getResponse().getContentAsString();
    assertThat(responseContent).contains(updatedSessionName);
    assertThat(responseContent).contains(updatedSessionDescription);
    assertThat(responseContent).contains(updatedSessionDate);
  }

  @Test
  @WithMockUser
  void putApiSession_WithNonNumericId_ReturnsBadRequest() throws Exception {
    String sessionId = "xx";
    String sessionName = "An  session";
    String sessionDescription = "An  description of";
    String sessionDate = "2000-01-01";
    String sessionRequest = "{\"name\":\"" + sessionName + "\",\"description\":\"" + sessionDescription
        + "\",\"date\":\"" + sessionDate + "\",\"teacher_id\":\"1\"}";

    mockMvc.perform(put("/api/session/{id}", sessionId)
        .contentType(MediaType.APPLICATION_JSON)
        .content(sessionRequest))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void deleteApiSession_WithValidId_ReturnsOk() throws Exception {
    Teacher teacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(teacher);
    Session session = TestDataGenerator.generateSessionWithTeacher(teacher);
    Session savedSession = sessionRepository.save(session);

    mockMvc.perform(delete("/api/session/{id}", savedSession.getId()))

        .andExpect(status().isOk());

    Session retrievedSession = sessionRepository.findById(savedSession.getId()).orElse(null);
    assertThat(retrievedSession).isNull();
  }

  @Test
  @WithMockUser
  void deleteApiSession_WithNotExistingId_ReturnsNotFound() throws Exception {
    String notValidSessionId = "-1000";

    mockMvc.perform(delete("/api/session/{id}", notValidSessionId))

        .andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser
  void deleteApiSession_WithNotValidId_ReturnsBadRequest() throws Exception {
    String notValidSessionId = "xx";

    mockMvc.perform(delete("/api/session/{id}", notValidSessionId))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void participateApiSession_WithValidIds_ReturnsOk() throws Exception {
    Teacher teacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(teacher);
    Session session = TestDataGenerator.generateSessionWithTeacher(teacher);
    Session savedSession = sessionRepository.save(session);
    User user = TestDataGenerator.generateUser();
    User savedUser = userRepository.save(user);

    mockMvc.perform(post("/api/session/{sessionId}/participate/{userId}", savedSession.getId(), savedUser.getId()))

        .andExpect(status().isOk());

    Session retrievedSession = sessionRepository.findById(savedSession.getId()).orElse(null);
    assertThat(retrievedSession.getUsers()).contains(savedUser);
  }

  @Test
  @WithMockUser
  void participateApiSession_WithNotNumericIds_ReturnsBadRequest() throws Exception {
    String notNumericId = "xx";

    mockMvc.perform(post("/api/session/{sessionId}/participate/{userId}", notNumericId, notNumericId))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void unParticipateApiSession_WithValidIds_ReturnsOk() throws Exception {
    Teacher teacher = TestDataGenerator.generateTeacher(null);
    Teacher savedTeacher = teacherRepository.save(teacher);
    User user = TestDataGenerator.generateUser();
    User savedUser = userRepository.save(user);
    Session session = TestDataGenerator.generateSessionWithTeacher(teacher);
    session.getUsers().add(savedUser);
    Session savedSession = sessionRepository.save(session);

    mockMvc.perform(delete("/api/session/{sessionId}/participate/{userId}", savedSession.getId(), savedUser.getId()))

        .andExpect(status().isOk());

    Session retrievedSession = sessionRepository.findById(savedSession.getId()).orElse(null);
    assertThat(retrievedSession.getUsers()).doesNotContain(savedUser);
  }

  @Test
  @WithMockUser
  void unParticipateApiSession_WithNotNumericIds_ReturnsBadRequest() throws Exception {
    String notNumericId = "xx";

    mockMvc.perform(delete("/api/session/{sessionId}/participate/{userId}", notNumericId, notNumericId))

        .andExpect(status().isBadRequest());
  }

}
