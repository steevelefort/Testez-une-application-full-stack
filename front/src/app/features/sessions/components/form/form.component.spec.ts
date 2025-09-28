import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher.service';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;
  let sessionApiService: SessionApiService

  const mockTeacher = {
    id: 1,
    lastName: 'Yo',
    firstName: 'Yogi',
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  }

  const mockTeacherService = {
    all: jest.fn().mockReturnValue(of([])),
    detail: jest.fn().mockReturnValue(of(mockTeacher))
  }

  const mockSessionService = {
    sessionInformation: {
      admin: true
    },
  }

  const mockSessionApiService = {
    detail: jest.fn(),
    update: jest.fn(),
    create: jest.fn()
  }

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sessionApiService = TestBed.inject(SessionApiService);

  });

  // Unit
  it('should load the form data on update mode', () => {
    Object.defineProperty(router, 'url', {
      value: 'session/update/1',
      configurable: true
    });
    component['id'] = '1'

    const spyInitForm = jest.spyOn(component as any, 'initForm'); // initForm is private
    const spyDetail = jest.spyOn(sessionApiService, 'detail');
    const mockSession = {
      name: 'une session',
      date: '2025-08-13',
      teacher_id: 1,
      description: 'une description'
    }
    mockSessionApiService.detail.mockReturnValue(of(mockSession));
    const spyExitPage = jest.spyOn(component as any, 'exitPage');
    spyExitPage.mockReturnValue(() => { });


    fixture.detectChanges();

    expect(component.onUpdate).toBe(true);
    expect(spyDetail).toHaveBeenCalledWith('1');
    expect(spyInitForm).toHaveBeenCalledWith(mockSession);
  })


  // Unit
  it('should call sessionService.update on form submit in update mode', () => {
    component.sessionForm = TestBed.inject(FormBuilder).group({});
    component.onUpdate = true;
    mockSessionApiService.update.mockReturnValue(of({}));
    const spy = jest.spyOn(sessionApiService, 'update');
    component.submit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  })

});



describe('FormComponentNoAdmin', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;

  const mockTeacher = {
    id: 1,
    lastName: 'Yo',
    firstName: 'Yogi',
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  }

  const mockTeacherService = {
    all: jest.fn().mockReturnValue(of([])),
    detail: jest.fn().mockReturnValue(of(mockTeacher))
  }

  const mockSessionService = {
    sessionInformation: {
      admin: false
    }
  }

  const mockSessionApiService = {
    detail: jest.fn(),
    update: jest.fn(),
    create: jest.fn()
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: '/sessions'
  }

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: Router, useValue: mockRouter},
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });


  // Unit
  it('should redirect to login if user is not admin', () => {
    const spy = jest.spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(['/sessions']);
  })

});






describe('FormComponent - Integration', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;
  let sessionApiService: SessionApiService

  const mockTeacher = {
    id: 1,
    lastName: 'Yo',
    firstName: 'Yogi',
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  }

  const mockUser = {
    id: 1,
    token: 'xxxxx',
    type: 'bearer',
    email: 'steeve@lefort-software.fr',
    username: 'Steeve Lefort',
    lastName: 'Lefort',
    firstName: 'Steeve',
    admin: true,
    password: 'xxxx',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockFormYoga = {
    name: "A session",
    description: "A good session",
    date: "2025-01-01",
    teacher_id: 1,
  }

  const mockYogaSession = {
    ...mockFormYoga,
    id: 1,
    users: [],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  }

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sessionApiService = TestBed.inject(SessionApiService);

  });

  // Integration
  it('should submit in create mode', () => {

    const httpController = TestBed.inject(HttpTestingController);
    component.sessionForm?.setValue(mockFormYoga);

    const spyExitPage = jest.spyOn(component as any, 'exitPage');

    component.submit();

    const postReq = httpController.expectOne({
      url: `${sessionApiService['pathService']}`,
      method: 'POST'
    })
    postReq.flush(mockYogaSession);

    expect(spyExitPage).toHaveBeenCalledWith('Session created !')

  });

  // Integration
  it('should load the form data on update mode', () => {
    Object.defineProperty(component['router'], 'url', {
      writable: true,
      value: '/sessions/update/1'
    });

    const httpController = TestBed.inject(HttpTestingController);
    const sessionService = TestBed.inject(SessionService);

    sessionService.logIn(mockUser)

    const spyInitForm = jest.spyOn(component as any, 'initForm'); // initForm is private
    const spySASDetail = jest.spyOn(sessionApiService, 'detail');

    component.ngOnInit();

    const getReq = httpController.expectOne(`${sessionApiService['pathService']}/${component['id']}`);
    getReq.flush(mockYogaSession);

    expect(spySASDetail).toHaveBeenCalledWith(component['id']);
    expect(spyInitForm).toHaveBeenCalledWith(mockYogaSession);
  })

  // Integration
  it('should update yoga session on form submit in update mode', () => {
    // component.sessionForm = TestBed.inject(FormBuilder).group({});
    component.onUpdate = true;
    component['id'] = '1';

    const httpController = TestBed.inject(HttpTestingController);
    component.sessionForm?.setValue(mockFormYoga); // Simulate new form values

    const spyExitPage = jest.spyOn(component as any, 'exitPage');

    component.submit();

    const postReq = httpController.expectOne({
      url: `${sessionApiService['pathService']}/${component['id']}`,
      method: 'PUT'
    })
    postReq.flush(mockYogaSession);

    expect(spyExitPage).toHaveBeenCalledWith('Session updated !')
  })

});



