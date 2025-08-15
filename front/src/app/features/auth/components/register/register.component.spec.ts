import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        BrowserAnimationsModule,
        HttpClientModule,
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
  it('should create', () => {
    expect(component).toBeTruthy();
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


