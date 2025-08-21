package com.openclassrooms.starterjwt.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService - Tests")
public class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  @Test
  @DisplayName("Should find user by id when user exists")
  void findById_shouldReturnUser_whenUserExists () {
    Long userId = 1L;
    User user = new User();
    user.setId(userId);
    user.setEmail("steeve@lefort-software.fr");
    user.setLastName("Lefort");
    user.setFirstName("Steeve");
    user.setPassword("password");
    user.setAdmin(true);
    when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    User foundUser = userService.findById(userId);

    assertThat(foundUser).isNotNull();
    assertThat(foundUser.getId()).isEqualTo(userId);
    assertThat(foundUser.getEmail()).isEqualTo("steeve@lefort-software.fr");
    assertThat(foundUser.getLastName()).isEqualTo("Lefort");
    assertThat(foundUser.getFirstName()).isEqualTo("Steeve");
    assertThat(foundUser.getPassword()).isEqualTo("password");
    assertThat(foundUser.isAdmin()).isTrue();
    verify(userRepository).findById(userId);
  }


  @Test
  @DisplayName("Should return null when user does not exist")
  void findById_shouldReturnNull_whenUserDoesNotExist () {
    Long userId = 1L;
    when(userRepository.findById(userId)).thenReturn(Optional.empty());

    User notFoundUser = userService.findById(userId);

    assertThat(notFoundUser).isNull();
    verify(userRepository).findById(userId);
  }


  @Test
  @DisplayName("Should delete user when user exists")
  void delete_shouldDeleteUser_whenUserExists () {
    Long userId = 1L;

    userService.delete(userId);

    verify(userRepository).deleteById(userId);
  }

}
