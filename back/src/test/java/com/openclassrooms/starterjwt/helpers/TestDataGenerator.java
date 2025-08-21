package com.openclassrooms.starterjwt.helpers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;

public class TestDataGenerator {

  private static String generateWord(int len) {
    int fixedLen = (len > 32) ? 32 : len;
    return UUID.randomUUID().toString().replace("-", "").substring(0, fixedLen);
  }

  /**
   * Generate an User without Id
   *
   * @return User
   */
  public static User generateUser() {
    User user = new User();
    user.setEmail("email." + generateWord(8) + "@test" + generateWord(4) + ".fr");
    user.setLastName("Doe-" + generateWord(4));
    user.setFirstName("John-" + generateWord(4));
    user.setPassword("Test123!");
    user.setAdmin(true);
    user.setCreatedAt(LocalDateTime.now());
    user.setUpdatedAt(LocalDateTime.now());
    return user;
  }

  /**
   * Gererate an User without Id but an email
   *
   * @param email an email address
   * @return User
   */
  public static User generateUserWithEmail(String email) {
    User user = generateUser();
    user.setEmail(email);
    return user;
  }

  /**
   * Generate an User with a specific Id
   *
   * @param id user id
   * @return User
   */
  public static User generateUser(Long id) {
    User user = generateUser();
    user.setId(id);
    return user;
  }

  /**
   * Generate a single fake teacher
   *
   * @param id id of the teacher
   * @return Teacher
   */
  public static Teacher generateTeacher(Long id) {
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
  public static List<Teacher> generateTeacherList(int quantity) {
    List<Teacher> teachers = new ArrayList<Teacher>();
    for (long i = 1L; i <= (long) quantity; i++) {
      Teacher teacher = generateTeacher(i);
      teachers.add(teacher);
    }
    return teachers;
  }

  /**
   * Generate a session with a specific Teacher
   *
   * @param teacher the teacher assuming the session
   * @return Session
   */
  public static Session generateSessionWithTeacher(Teacher teacher) {
    Session session = new Session();
    session.setName("A session");
    session.setDate(new Date());
    session.setDescription("This is a description");
    session.setTeacher(teacher);
    session.setUsers(new ArrayList<>());
    return session;
  }

  /**
   * Generate a session with a fake Teacher
   *
   * @return Session
   */
  public static Session generateSession() {
    Teacher teacher = generateTeacher(1L);
    return generateSessionWithTeacher(teacher);
  }

  /**
   * Generate a session with a specific Id
   *
   * @param id description
   * @return Session
   */
  public static Session generateSession(Long id) {
    Session session = generateSession();
    session.setId(id);
    return session;
  }

}
