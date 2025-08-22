package com.openclassrooms.starterjwt.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.helpers.TestDataGenerator;
import com.openclassrooms.starterjwt.models.User;

@SpringBootTest
@DisplayName("UserMapper - Tests")
public class UserMapperIntegrationTest {

  @Autowired
  UserMapper userMapper;

  @Test
  void toEntity_shouldReturnNull_withNullEntry() {
    assertThat(userMapper.toEntity((UserDto) null)).isNull();
    assertThat(userMapper.toEntity((List<UserDto>) null)).isNull();
  }

  @Test
  void toDto_shouldReturnNull_withNullEntry() {
    assertThat(userMapper.toDto((User) null)).isNull();
    assertThat(userMapper.toDto((List<User>) null)).isNull();
  }

  @Test
  void toEntity_shouldReturnAValidEntity_withValidData() {
    UserDto userDto = new UserDto();
    userDto.setId(1L);
    userDto.setEmail("steeve@lefort-software.fr");
    userDto.setFirstName("Steeve");
    userDto.setLastName("Lefort");
    userDto.setAdmin(false);
    userDto.setPassword("Test123!");

    User user = userMapper.toEntity(userDto);

    assertThat(user.getId()).isEqualTo(userDto.getId());
    assertThat(user.getLastName()).isEqualTo(userDto.getLastName());
    assertThat(user.getFirstName()).isEqualTo(userDto.getFirstName());
    assertThat(user.getEmail()).isEqualTo(userDto.getEmail());
    assertThat(user.isAdmin()).isEqualTo(userDto.isAdmin());
    assertThat(user.getPassword()).isEqualTo(userDto.getPassword());
  }

  @Test
  void toEntity_shouldReturnAListOfEntities_withValidDtos() {
    ArrayList<UserDto> userDtos = new ArrayList<>();
    UserDto userDto1 = new UserDto();
    userDto1.setFirstName("John");
    userDto1.setLastName("Doe");
    userDto1.setEmail("john@doe.fr");
    userDto1.setAdmin(false);
    userDto1.setPassword("Test123!");
    userDto1.setId(1L);
    userDtos.add(userDto1);
    UserDto userDto2 = new UserDto();
    userDto2.setFirstName("John2");
    userDto2.setLastName("Doe2");
    userDto2.setEmail("john@doe.fr");
    userDto2.setAdmin(false);
    userDto2.setPassword("Test123!");
    userDto2.setId(2L);
    userDtos.add(userDto2);

    List<User> users = userMapper.toEntity(userDtos);

    assertThat(users.get(0).getId()).isEqualTo(userDto1.getId());
    assertThat(users.get(0).getFirstName()).isEqualTo(userDto1.getFirstName());
    assertThat(users.get(0).getLastName()).isEqualTo(userDto1.getLastName());
    assertThat(users.get(0).getPassword()).isEqualTo(userDto1.getPassword());
    assertThat(users.get(1).getId()).isEqualTo(userDto2.getId());
    assertThat(users.get(1).getFirstName()).isEqualTo(userDto2.getFirstName());
    assertThat(users.get(1).getLastName()).isEqualTo(userDto2.getLastName());
  }

  @Test
  void toDto_shouldReturnAListOfDtos_withValidEntities() {
    ArrayList<User> users = new ArrayList<>();
    User user1 = TestDataGenerator.generateUser(1L);
    User user2 = TestDataGenerator.generateUser(2L);
    users.add(user1);
    users.add(user2);

    List<UserDto> userDtos = userMapper.toDto(users);

    assertThat(userDtos.get(0).getId()).isEqualTo(user1.getId());
    assertThat(userDtos.get(0).getFirstName()).isEqualTo(user1.getFirstName());
    assertThat(userDtos.get(0).getLastName()).isEqualTo(user1.getLastName());
    assertThat(userDtos.get(1).getId()).isEqualTo(user2.getId());
    assertThat(userDtos.get(1).getFirstName()).isEqualTo(user2.getFirstName());
    assertThat(userDtos.get(1).getLastName()).isEqualTo(user2.getLastName());
  }

}
