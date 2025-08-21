package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.helpers.TestDataGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
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
class AuthControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Test
  @WithMockUser
  void postApiAuthLogin_ValidCredentials_ReturnsOk() throws Exception {
    User testUser = TestDataGenerator.generateUser(null);
    String password = testUser.getPassword();
    String passwordHash = passwordEncoder.encode(password);
    testUser.setPassword(passwordHash);
    User savedUser = userRepository.save(testUser);

    String loginRequest = "{\"email\":\"" + savedUser.getEmail() + "\",\"password\":\""+password+"\"}";

    MvcResult result = mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(loginRequest))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    
    String response = result.getResponse().getContentAsString();
    assertThat(response).contains("token"); // ou le nom du champ JWT
    assertThat(response).contains(testUser.getEmail());
    assertThat(response).contains(testUser.getFirstName());
    assertThat(response).contains("true"); // isAdmin

  }


  @Test
  void postApiAuthRegister_ValidData_ReturnsOk() throws Exception {
    String firstName = "Steeve";
    String lastName = "Lefort";
    String email = "not-existing-1234@not-existing.domain";
    String password = "Test1234!";

    String registerRequest = "{\"email\":\""+email+"\",\"firstName\":\""+firstName+"\",\"lastName\":\""+lastName+"\",\"password\":\""+password+"\"}";

    MvcResult result = mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(registerRequest))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    
    String response = result.getResponse().getContentAsString();
    assertThat(response).contains("User registered successfully!");
  }


  @Test
  void postApiAuthRegister_AlreadyExistingEmail_ReturnsBadRequest() throws Exception {
    User user = TestDataGenerator.generateUser();
    User savedUser = userRepository.save(user);

    String registerRequest = "{\"email\":\""+user.getEmail()+"\",\"firstName\":\""+user.getFirstName()+"\",\"lastName\":\""+user.getLastName()+"\",\"password\":\""+user.getPassword()+"\"}";

    MvcResult result = mockMvc.perform(post("/api/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(registerRequest))
        .andExpect(status().isBadRequest())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andReturn();
    
    String response = result.getResponse().getContentAsString();
    assertThat(response).contains("Error: Email is already taken!");
  }

}
