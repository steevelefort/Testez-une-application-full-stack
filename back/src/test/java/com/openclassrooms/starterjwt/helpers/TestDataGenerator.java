package com.openclassrooms.starterjwt.helpers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;

public class TestDataGenerator {

  private static String generateWord(int len) {
    int fixedLen = (len>32) ? 32 : len;
    return UUID.randomUUID().toString().replace("-", "").substring(0, fixedLen);
  }

  public static User generateUser() {
    User user = new User();

    user.setEmail("email."+generateWord(8)+"@test"+generateWord(4)+".fr");
    user.setLastName("Doe-"+generateWord(4));
    user.setFirstName("John-"+generateWord(4));
    user.setPassword("Test123!");
    user.setAdmin(true);
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());
    return user;
  }

  public static User generateUserWithEmail(String email) {
    User user = generateUser();
    user.setEmail(email);
    return user;
  }

  public static User generateUser(Long id) {
    User user = generateUser();
    user.setId(id);
    return user;
  }

  public static Teacher generateTeacher(Long id) {
    Teacher teacher = new Teacher();
    if (id != null) teacher.setId(id);
    teacher.setFirstName("John");
    teacher.setLastName("Doe");
    return teacher;
  }



  public static Session generateSessionWithTeacher(Teacher teacher) {
    Session session = new Session();
    session.setName("A session");
    session.setDate(new Date());
    session.setDescription("This is a description");
    session.setTeacher(teacher);
    session.setUsers(new ArrayList<>());
    return session;
  }


  public static Session generateSession() {
    Teacher teacher = generateTeacher(1L);

    return generateSessionWithTeacher(teacher);
  }

  public static Session generateSession(Long id) {
    Session session = generateSession();
    session.setId(id);
    return session;
  }


}
