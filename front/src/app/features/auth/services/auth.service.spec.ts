import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { Observable, of } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
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
        HttpClientModule
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ]
    });
    service = TestBed.inject(AuthService);
    pathService = service['pathService'];
  });

  it('should return an Observable when register() is called', () => {
    const mockRegisterRequest = {
      email: 'steeve@lefort-software.fr',
      firstName: 'steeve',
      lastName: 'lefort',
      password: 'password',
    }

    const result = service.register(mockRegisterRequest);

    expect(mockHttpClient.post).toHaveBeenCalledWith(`${pathService}/register`, mockRegisterRequest);
    expect(result).toBeInstanceOf(Observable<void>);
  })


  it('should return an Observable when login() is called', () => {
    const mockLoginRequest = {
      email: 'steeve@lefort-software.fr',
      password: 'password'
    }
    const result = service.login(mockLoginRequest);
    expect(mockHttpClient.post).toHaveBeenCalledWith(`${pathService}/login`, mockLoginRequest);
    expect(result).toBeInstanceOf(Observable<SessionInformation>);
  })

});






