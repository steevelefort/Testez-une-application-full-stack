import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { Observable } from 'rxjs';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  const sessionInformationSample = {
    token: "xxxx",
    type: "admin",
    id: 1,
    username: "Steeve",
    firstName: "Steeve",
    lastName: "Lefort",
    admin: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  // Unit
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // Unit
  it('should mark user as logged when calling logIn', () => {

    const sessionInformation = { ...sessionInformationSample };
    service.logIn(sessionInformation);
    expect(service.isLogged).toBe(true);
    expect(service.sessionInformation).toEqual(sessionInformation);
  });

  // Unit
  it('should disconnect user when calling logOut', () => {

    const sessionInformation = { ...sessionInformationSample };

    service.logIn(sessionInformation);
    service.logOut();
    expect(service.isLogged).toBe(false);
    expect(service.sessionInformation).toBeUndefined();
  })


  // Unit
  it('should return an observable', () => {
    const result = service.$isLogged();
    expect(result).toBeInstanceOf(Observable<boolean>);
  })



});
