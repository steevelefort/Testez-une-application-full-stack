import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from '../../services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  const mockAuthService = {
    register: jest.fn().mockReturnValue(of(null)),
    login: jest.fn() //.mockReturnValue(of(null))
  }

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut: jest.fn(),
    logIn: jest.fn()
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    const loginData = {
      email: 'steeve@lefort-software.fr',
      password: 'password'
    };
    component.form.setValue(loginData);

    fixture.detectChanges();
  });


  // Unit
  it('should call authService.login with form data', () => {
    const mockResponse = { id: 1, admin: true, email: 'steeve@lefort-software.fr' };
    mockAuthService.login.mockReturnValue(of(mockResponse));

    component.submit();

    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
  })

  // Unit
  it('should set onError to true if login fails', () => {
    // AuthService can throw an error
    mockAuthService.login.mockReturnValue(throwError(() => new Error("Invalid credentials")));

    component.submit();

    expect(component.onError).toBe(true);
  })

});





describe('LoginComponent Integration', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  const mockResponse = { id: 1, admin: true, email: 'steeve@lefort-software.fr' };
  const mockLoginRequest = {
    email: 'steeve@lefort-software.fr',
    password: 'password'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.form.setValue(mockLoginRequest);

    fixture.detectChanges();
  });

  // Integration
  it('should login and redirect to /sessions', () => {

    const httpController = TestBed.inject(HttpTestingController);
    const authService = TestBed.inject(AuthService);
    const sessionService = TestBed.inject(SessionService);

    component.submit();

    const postReq = httpController.expectOne({
      url: `${authService['pathService']}/login`,
      method: 'POST'
    })
    postReq.flush(mockResponse);

    expect(sessionService.isLogged).toBe(true);
    expect(sessionService.sessionInformation).toEqual(mockResponse);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
  })

  // Integration
  it('should set onError to true if login fails', () => {
    const httpController = TestBed.inject(HttpTestingController);
    const authService = TestBed.inject(AuthService);
    const sessionService = TestBed.inject(SessionService);

    component.submit();
    const postReq = httpController.expectOne({
      url: `${authService['pathService']}/login`,
      method: 'POST'
    })
    postReq.flush('Invalid credentials', { status: 401, statusText: 'Unauthorized' });

    expect(component.onError).toBe(true);
  })

});
