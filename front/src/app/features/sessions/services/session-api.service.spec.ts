import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { Observable, of } from 'rxjs';
import { Session } from '../interfaces/session.interface';

import { SessionApiService } from './session-api.service';

describe('SessionApiService', () => {
  let service: SessionApiService;
  let pathService: string;

  const mockHttpClient = {
    get: jest.fn().mockReturnValue(of(null)),
    delete: jest.fn().mockReturnValue(of(null)),
    post: jest.fn().mockReturnValue(of(null)),
    put: jest.fn().mockReturnValue(of(null)),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ]
    });
    service = TestBed.inject(SessionApiService);
    pathService = service['pathService'];
  });


  // Unit
  it('should return an Observable when all() is called', () => {
    const result = service.all();

    expect(mockHttpClient.get).toHaveBeenCalledWith(pathService);
    expect(result).toBeInstanceOf(Observable<Session[]>);
  })

  // Unit
  it('should return an Observable when detail() is called with an id', () => {
    const id = '1';
    const result = service.detail(id);

    expect(mockHttpClient.get).toHaveBeenCalledWith(`${pathService}/${id}`);
    expect(result).toBeInstanceOf(Observable<Session>);
  })

  // Unit
  it('should return an Observable when delete() is called', () => {
    const id = '1';
    const result = service.delete(id);

    expect(mockHttpClient.delete).toHaveBeenCalledWith(`${pathService}/${id}`);
    expect(result).toBeInstanceOf(Observable<any>);
  })

  // Unit
  it('should return an Observable when create() is called with a Session', () => {
    const mockSession = {
      id: 1,
      name: 'Session',
      description: 'this is a session',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = service.create(mockSession);

    expect(mockHttpClient.post).toHaveBeenCalledWith(pathService,mockSession);
    expect(result).toBeInstanceOf(Observable<Session>);
  })

  // Unit
  it('should return an Observable when update() is called with an id and a Session', () => {
    const id = '1';
    const mockSession = {
      id: 1,
      name: 'Session',
      description: 'this is a session',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const result = service.update(id, mockSession);

    expect(mockHttpClient.put).toHaveBeenCalledWith(`${pathService}/${id}`,mockSession);
    expect(result).toBeInstanceOf(Observable<Session>);
  })

  // Unit
  it('should return an Observable when participate() is called with a sessionId and a userId', () => {
    const userId = '1';
    const sessionId = '1';

    const result = service.participate(sessionId,userId);

    expect(mockHttpClient.post).toHaveBeenCalledWith(`${pathService}/${sessionId}/participate/${userId}`, null);
    expect(result).toBeInstanceOf(Observable<void>);
  })

  // Unit
  it('should return an Observable when unParticipate() is called with a sessionId and a userId', () => {
    const userId = '1';
    const sessionId = '1';

    const result = service.unParticipate(sessionId,userId);

    expect(mockHttpClient.delete).toHaveBeenCalledWith(`${pathService}/${sessionId}/participate/${userId}`);
    expect(result).toBeInstanceOf(Observable<void>);
  })


});






