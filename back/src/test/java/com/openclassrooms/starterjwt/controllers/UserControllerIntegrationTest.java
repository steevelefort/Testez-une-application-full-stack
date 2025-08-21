package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.models.User;
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
class UserControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  UserRepository userRepository;

  @Test
  @WithMockUser
  void getApiUser_ValidId_ReturnsOkAndUserData() throws Exception {
    // Generate and save a user in the database
    User testUser = TestDataGenerator.generateUser(null);
    User savedUser = userRepository.save(testUser);

    MvcResult result = mockMvc.perform(get("/api/user/{id}", savedUser.getId()))

        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();

    String responseContent = result.getResponse().getContentAsString();
    assertThat(responseContent).contains(savedUser.getEmail());
    assertThat(responseContent).contains(savedUser.getFirstName());
    assertThat(responseContent).contains(savedUser.getLastName());
  }

  @Test
  @WithMockUser
  void getApiUser_NonValidId_ReturnsBadRequest() throws Exception {
    String userId = "xx";

    mockMvc.perform(get("/api/user/{id}", userId))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser
  void getApiUser_NonExistingId_ReturnsNotFound() throws Exception {
    String notExistingUserId = "-1000";

    mockMvc.perform(get("/api/user/{id}", notExistingUserId))

        .andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser(username = "user-x270190@existing.domain")
  void deleteApiUser_ValidIdAndSameAsCurrentUser_DeleteUserAndReturnOk() throws Exception {
    String userEmail = "user-x270190@existing.domain";
    // Generate and save a user in the database
    User testUser = TestDataGenerator.generateUserWithEmail(userEmail);
    User savedUser = userRepository.save(testUser);

    mockMvc.perform(delete("/api/user/{id}", savedUser.getId()))

        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "user-x270190@existing.domain")
  void deleteApiUser_NotExistingId_ReturnNotFound() throws Exception {
    String notExistingUserId = "-1000";

    mockMvc.perform(delete("/api/user/{id}", notExistingUserId))

        .andExpect(status().isNotFound());
  }

  @Test
  @WithMockUser(username = "user-x270190@existing.domain")
  void deleteApiUser_NotNumericId_ReturnBadRequest() throws Exception {
    String notNumericUserId = "xxxx";

    mockMvc.perform(delete("/api/user/{id}", notNumericUserId))

        .andExpect(status().isBadRequest());
  }

  @Test
  @WithMockUser(username = "user-x270190@existing.domain")
  void deleteApiUser_ValidIdAndDifferentAsCurrentUser_ReturnUnauthorized() throws Exception {
    String userEmail = "user-a123456@existing.domain";
    // Generate and save a user in the database
    User testUser = TestDataGenerator.generateUserWithEmail(userEmail);
    User savedUser = userRepository.save(testUser);

    mockMvc.perform(delete("/api/user/{id}", savedUser.getId()))

        .andExpect(status().isUnauthorized());
  }

}
