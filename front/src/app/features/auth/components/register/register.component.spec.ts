import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  const mockAuthService = {
    register: jest.fn().mockReturnValue(of(null)),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    const registerData = {
      firstName: "Steeve",
      lastName: "Lefort",
      email: 'steeve@lefort-software.fr',
      password: 'password'
    };
    component.form.setValue(registerData);

    fixture.detectChanges();
  });

  // Unit
  it('should navigate to login page if register is successful', () => {
    mockAuthService.register.mockReturnValue(of(null));
    component.submit();

    expect(mockAuthService.register).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  })


  // Unit
  it('should set onError to true if register fails', () => {
    // AuthService can throw an error
    mockAuthService.register.mockReturnValue(throwError(() => new Error("An error occurred")));

    component.submit();

    expect(component.onError).toBe(true);
  })

});


describe('RegisterComponent - Integration', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    const registerData = {
      firstName: "Steeve",
      lastName: "Lefort",
      email: 'steeve@lefort-software.fr',
      password: 'password'
    };
    component.form.setValue(registerData);

    fixture.detectChanges();
  });

  // Integration
  it('should register a user and then navigate to login page if successful', () => {

    const httpController = TestBed.inject(HttpTestingController);
    const authService = TestBed.inject(AuthService);

    component.submit();

    const postReq = httpController.expectOne({
      url:`${authService['pathService']}/register`,
      method: 'POST'
    })
    postReq.flush(null);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  })


  // Integration
  it('should set onError to true if register fails', () => {
    const httpController = TestBed.inject(HttpTestingController);
    const authService = TestBed.inject(AuthService);

    component.submit();
    const postReq = httpController.expectOne({
      url:`${authService['pathService']}/register`,
      method: 'POST'
    })
    postReq.flush('Registration failed', { status: 400, statusText: 'Bad request' });

    expect(component.onError).toBe(true);
  })

});


