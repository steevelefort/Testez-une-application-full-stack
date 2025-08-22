package com.openclassrooms.starterjwt.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.rmi.NotBoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.helpers.TestDataGenerator;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("SessionService - Tests")
public class SessionServiceTest {

  @Mock
  SessionRepository sessionRepository;

  @Mock
  UserRepository userRepository;

  @InjectMocks
  SessionService sessionService;

  @Test
  void save_shouldSaveASession() {
    Session session = TestDataGenerator.generateSession(1L);
    when(sessionRepository.save(session)).thenReturn(session);

    Session result = sessionService.create(session);

    assertThat(result).isEqualTo(session);
    verify(sessionRepository).save(session);
  }

  @Test
  void delete_shouldDeleteASession() {
    Long id = 1L;

    sessionService.delete(id);

    verify(sessionRepository).deleteById(id);
  }

  @Test
  void findAll_shouldReturnAllSessions() {
    List<Session> sessions = new ArrayList<>();
    for (Long i = 1L; i <= 3L; i++) {
      sessions.add(TestDataGenerator.generateSession(i));
    }
    when(sessionRepository.findAll()).thenReturn(sessions);

    List<Session> result = sessionService.findAll();

    assertThat(result).containsExactlyElementsOf(sessions);
    verify(sessionRepository).findAll();
  }

  @Test
  void getById_shouldReturnSession_whenSessionExists() {
    Long id = 1L;
    Session expectedSession = TestDataGenerator.generateSession(id);
    when(sessionRepository.findById(id)).thenReturn(Optional.of(expectedSession));

    Session result = sessionService.getById(id);

    assertThat(result).isEqualTo(expectedSession);
    verify(sessionRepository).findById(id);
  }

  @Test
  void getById_shouldReturnNull_whenSessionDoesNotExist() {
    Long id = 1L;
    when(sessionRepository.findById(id)).thenReturn(Optional.empty());

    Session result = sessionService.getById(id);

    assertThat(result).isNull();
    verify(sessionRepository).findById(id);
  }

  @Test
  void update_shouldUpdateSession_whenSessionExists() {
    Long id = 1L;
    Session session = TestDataGenerator.generateSession(id);
    when(sessionRepository.save(session)).thenReturn(session);

    Session result = sessionService.update(id, session);

    assertThat(result).isEqualTo(session);
    verify(sessionRepository).save(session);
  }

  @Test
  void participate_shouldParticipateInSession_whenUserNotAlreadyParticipate() {
    Long sessionId = 1L;
    Long userId = 1L;
    User participant = TestDataGenerator.generateUser(userId);
    Session session = TestDataGenerator.generateSession(sessionId);
    when(userRepository.findById(userId)).thenReturn(Optional.of(participant));
    when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

    sessionService.participate(sessionId, userId);

    assertThat(session.getUsers()).contains(participant);
    verify(sessionRepository).save(session);
  }

  @Test
  void participate_shouldThrowException_whenSessionDoesNotExist() {
    Long sessionId = 1L;
    Long userId = 1L;

    when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> {
      sessionService.participate(sessionId, userId);
    });
  }

  @Test
  void participate_shouldThrowException_whenUserDoesNotExist() {
    Long sessionId = 1L;
    Long userId = 1L;
    Session session = TestDataGenerator.generateSession(sessionId);

    when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
    when(userRepository.findById(userId)).thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> {
      sessionService.participate(sessionId, userId);
    });
  }

  @Test
  void participate_shouldThrowException_whenUserAlreadyParticipate() {
    Long sessionId = 1L;
    Long userId = 1L;
    User participant = TestDataGenerator.generateUser(userId);
    Session session = TestDataGenerator.generateSession(sessionId);
    session.getUsers().add(participant);
    when(userRepository.findById(userId)).thenReturn(Optional.of(participant));
    when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

    assertThrows(BadRequestException.class, () -> {
      sessionService.participate(sessionId, userId);
    });
  }

  @Test
  void noLongerParticipate_shouldNoLongerParticipateToASession_whenUserParticipate() {
    Long sessionId = 1L;
    Long userId = 1L;
    User toRemoveUser = TestDataGenerator.generateUser(userId);
    User toNotRemoveUser = TestDataGenerator.generateUser(2L);
    Session session = TestDataGenerator.generateSession(sessionId);
    session.getUsers().add(toRemoveUser);
    session.getUsers().add(toNotRemoveUser);
    when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

    sessionService.noLongerParticipate(sessionId, userId);

    assertThat(session.getUsers()).doesNotContain(toRemoveUser);
    assertThat(session.getUsers()).contains(toNotRemoveUser);
    verify(sessionRepository).save(session);
  }

  @Test
  void noLongerParticipate_shouldThrowException_whenSessionDoesNotExist() {
    Long sessionId = 1L;
    Long userId = 1L;

    when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

    assertThrows(NotFoundException.class, () -> {
      sessionService.noLongerParticipate(sessionId, userId);
    });
  }

  @Test
  void noLongerParticipate_shouldThrowException_whenUserNotParticipate() {
    Long sessionId = 1L;
    Long userId = 1L;
    User participant = TestDataGenerator.generateUser(userId);
    Session session = TestDataGenerator.generateSession(sessionId);

    when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

    assertThrows(BadRequestException.class, () -> {
      sessionService.noLongerParticipate(sessionId, userId);
    });
  }

}
