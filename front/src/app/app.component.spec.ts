import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './features/auth/services/auth.service';
import { SessionService } from './services/session.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    $isLogged: jest.fn().mockReturnValue(of(true)),
    logOut: jest.fn()
  }

  const mockAuthService = {
    register: jest.fn().mockReturnValue(of(null)),
    login: jest.fn().mockReturnValue(of(null))
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: SessionService, useValue: mockSessionService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Unit
  it('should call $isLogged on SessionService', () => {
    const result = component.$isLogged();
    expect(mockSessionService.$isLogged).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Observable);
  })

  // Unit
  it('should logout and navigate to home page', () => {
    const router = TestBed.inject(Router);
    const ngZone = TestBed.inject(NgZone);
    const navigateSpy = jest.spyOn(router, 'navigate');
    ngZone.run(() => {
      component.logout();
    })
    expect(mockSessionService.logOut).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  })

});




describe('AppComponent - Integration', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Integration
  it('should call $isLogged on SessionService', () => {
    const sessionService = TestBed.inject(SessionService);
    const spySessionService = jest.spyOn(sessionService, '$isLogged');

    const result = component.$isLogged();
    expect(spySessionService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Observable);
  })

  // Integration
  it('should logout and navigate to home page', () => {
    const sessionService = TestBed.inject(SessionService);
    const router = TestBed.inject(Router);
    const ngZone = TestBed.inject(NgZone);
    const spySessionService = jest.spyOn(sessionService, 'logOut');
    const navigateSpy = jest.spyOn(router, 'navigate');
    ngZone.run(() => {
      component.logout();
    })
    expect(spySessionService).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  })

});
