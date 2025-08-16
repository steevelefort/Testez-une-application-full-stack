import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockHttpClient = {
    get: jest.fn().mockReturnValue(of(null)),
    delete: jest.fn().mockReturnValue(of(null))
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ]
    });
    service = TestBed.inject(UserService);
  });

  // Unit
  it('should call http.get when getById is called and return an Observable', () => {
    const id = '1';
    const result = service.getById(id);
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${service['pathService']}/${id}`);
    expect(result).toBeInstanceOf(Observable<User>);
  })


  // Unit
  it('should call http.delete when delete is called and return an Observable', () => {
    const id = '1';
    const result = service.delete(id);
    expect(mockHttpClient.delete).toHaveBeenCalledWith(`${service['pathService']}/${id}`);
    expect(result).toBeInstanceOf(Observable<any>);
  })

});
