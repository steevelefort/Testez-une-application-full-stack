import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

import { MeComponent } from './me.component';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut: jest.fn()
  }

  const mockUser = {
    id: 1,
    email: "steeve@lefort-software.fr",
    lastName: "Lefort",
    firstName: "Steeve",
    admin: true,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01"
  }
  const mockUserService = {
    getById: jest.fn().mockReturnValue(of(mockUser)),
    delete: jest.fn().mockReturnValue(of(null))
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  const mockMatSnackBar = {
    open: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Unit
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Unit
  it('should call history.back when back is called', () => {
    const spy = jest.spyOn(window.history, 'back');

    component.back();

    expect(spy).toHaveBeenCalled();
  })

  // Unit
  it('should call delete on userService, logout, and navigate to home', () => {
    component.delete();
    expect(mockUserService.delete).toHaveBeenCalledWith(mockSessionService.sessionInformation.id.toString());
    expect(mockSessionService.logOut).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  })

});
