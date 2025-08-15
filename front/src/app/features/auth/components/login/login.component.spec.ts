import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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


  // public register(registerRequest: RegisterRequest): Observable<void> {
  // public login(loginRequest: LoginRequest): Observable<SessionInformation> {
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
      // providers: [SessionService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
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
  it('should create', () => {
    expect(component).toBeTruthy();
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
