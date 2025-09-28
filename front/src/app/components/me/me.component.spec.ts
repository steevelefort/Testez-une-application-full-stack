import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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




describe('MeComponent - Integration', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  const mockUser = {
    id: 1,
    email: "steeve@lefort-software.fr",
    lastName: "Lefort",
    firstName: "Steeve",
    admin: true,
    password: "password",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  }

  const mockSessionInformation = {
    token: "xxxxx",
    type: "bearer",
    id: mockUser.id,
    username: mockUser.lastName + " " + mockUser.firstName,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    admin: mockUser.admin,
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
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
  });

  // Integration
  it('should call delete on userService, logout, and navigate to home', () => {
    const httpController = TestBed.inject(HttpTestingController);
    const sessionService = TestBed.inject(SessionService);
    sessionService.logIn(mockSessionInformation);
    const userService = TestBed.inject(UserService);

    fixture.detectChanges();

    component.delete();

    // Expect a GET to retrieve user information (sessionService.logIn)
    const getReq = httpController.expectOne({
      url: `${userService['pathService']}/${mockUser.id}`,
      method: 'GET'
    });
    getReq.flush(mockUser);

    // Expect a DELETE to delete user
    const deleteReq = httpController.expectOne({
      url: `${userService['pathService']}/${mockUser.id}`,
      method: 'DELETE'
    });
    deleteReq.flush(null);

    expect(sessionService.isLogged).toBe(false);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  })

});
