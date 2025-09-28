import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { TeacherService } from 'src/app/services/teacher.service';
import { SessionService } from '../../../../services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { DetailComponent } from './detail.component';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  const mockSessionApiService = {
    delete: jest.fn().mockReturnValue(of({})),
    detail: jest.fn().mockReturnValue(of(null)),
    participate: jest.fn().mockReturnValue(of(null)),
    unParticipate: jest.fn().mockReturnValue(of(null))
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  const mockMatSnackBar = {
    open: jest.fn()
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  };

  const mockHttpClient = {
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      declarations: [DetailComponent],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, useValue: mockSessionApiService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClient, useValue: mockHttpClient }
      ],
    })
      .compileComponents();
    service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    component.userId = '1';
    component.sessionId = '1';
    fixture.detectChanges();
  });


  // Unit
  it('should go back in history when back is called', () => {
    const spy = jest.spyOn(window.history, 'back');

    component.back();

    expect(spy).toHaveBeenCalled();
  })

  // Unit
  it('should delete session when delete is called', () => {
    const router = TestBed.inject(Router);
    const spyNavigate = jest.spyOn(router, "navigate");
    component.delete();
    expect(mockSessionApiService.delete).toHaveBeenCalledWith(component.sessionId);
    expect(spyNavigate).toHaveBeenCalled();
  });

  // Unit
  it('should call participate when participate is called', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');
    component.participate();
    expect(mockSessionApiService.participate).toHaveBeenCalledWith(component.sessionId, component.userId);
    expect(spyFetchSession).toHaveBeenCalled();
  })

  // Unit
  it('should call unParticipate when unParticipate is called', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');
    component.unParticipate();
    expect(mockSessionApiService.unParticipate).toHaveBeenCalledWith(component.sessionId, component.userId);
    expect(spyFetchSession).toHaveBeenCalled();
  })

});






describe('DetailComponent - Integration', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let sessionService: SessionService;

  const mockSessionInformation = {
    token: "xxxxx",
    type: "bearer",
    id: 1,
    username: 'Steeve Lefort',
    firstName: 'Steeve',
    lastName: 'Lefort',
    admin: true
  }

  const mockYogaSession = {
    id: 1,
    name: 'The best session',
    description: 'Really the best session',
    date: new Date(),
    teacher_id: 1,
    users: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const mockTeacher = {
    id: 1,
    lastName: 'Yo',
    firstName: 'Yogi',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockRouter = {
    navigate: jest.fn(),
    url: ''
  };

  const mockMatSnackBar = {
    open: jest.fn()
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('1')
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      declarations: [DetailComponent],
      providers: [
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    })
      .compileComponents();
    sessionService = TestBed.inject(SessionService);
    sessionService.logIn(mockSessionInformation);

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;

    // Not called to be able to run ngOnInit
    // fixture.detectChanges();
  });

  // Integration
  it('should load session information on init', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');

    const httpController = TestBed.inject(HttpTestingController);
    const sessionApiService = TestBed.inject(SessionApiService);
    const teacherService = TestBed.inject(TeacherService);

    component.ngOnInit();

    // SessionApiService must get the session
    const getSessionReq = httpController.expectOne(`${sessionApiService['pathService']}/${component.sessionId}`);
    getSessionReq.flush(mockYogaSession);

    // TeacherService must get the teacher
    const getTeacherReq = httpController.expectOne(`${teacherService['pathService']}/${mockYogaSession.teacher_id.toString()}`);
    getTeacherReq.flush(mockTeacher);

    expect(spyFetchSession).toHaveBeenCalled();
    expect(component.session).toEqual(mockYogaSession);
    expect(component.teacher).toEqual(mockTeacher);
  });

  // Integration
  it('should delete session and redirect to "sessions"', () => {
    const router = TestBed.inject(Router);
    const httpController = TestBed.inject(HttpTestingController);
    const sessionApiService = TestBed.inject(SessionApiService);
    component.delete();

    const deleteReq = httpController.expectOne({
      url: `${sessionApiService['pathService']}/${component.sessionId}`,
      method: 'DELETE'
    });
    deleteReq.flush(null);

    expect(router.navigate).toHaveBeenCalledWith(['sessions']);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith('Session deleted !', 'Close', { duration: 3000 });
  });

  // Integration
  it('should make user participate to a session', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');

    const mockYogaSessionClone = {...mockYogaSession, users:[parseInt(component.userId)]}

    const httpController = TestBed.inject(HttpTestingController);
    const sessionApiService = TestBed.inject(SessionApiService);
    const teacherService = TestBed.inject(TeacherService);

    component.participate();

    // Mark user as participant
    const postReq = httpController.expectOne({
      url: `${sessionApiService['pathService']}/${component.sessionId}/participate/${component.userId}`,
      method: 'POST'
    });
    postReq.flush(null);

    // SessionApiService must get the session
    const getSessionReq = httpController.expectOne(`${sessionApiService['pathService']}/${component.sessionId}`);
    getSessionReq.flush(mockYogaSessionClone);

    // TeacherService must get the teacher
    const getTeacherReq = httpController.expectOne(`${teacherService['pathService']}/${mockYogaSession.teacher_id.toString()}`);
    getTeacherReq.flush(mockTeacher);

    expect(spyFetchSession).toHaveBeenCalled();
    expect(component.session).toEqual(mockYogaSessionClone);
    expect(component.isParticipate).toBe(true);
    expect(component.teacher).toEqual(mockTeacher);
  })

  // Integration
  it('should remove user form participants', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');

    const httpController = TestBed.inject(HttpTestingController);
    const sessionApiService = TestBed.inject(SessionApiService);
    const teacherService = TestBed.inject(TeacherService);

    component.unParticipate();

    // Remove user from participant
    const postReq = httpController.expectOne({
      url: `${sessionApiService['pathService']}/${component.sessionId}/participate/${component.userId}`,
      method: 'DELETE'
    });
    postReq.flush(null);

    // SessionApiService must get the session
    const getSessionReq = httpController.expectOne(`${sessionApiService['pathService']}/${component.sessionId}`);
    getSessionReq.flush(mockYogaSession);

    // TeacherService must get the teacher
    const getTeacherReq = httpController.expectOne(`${teacherService['pathService']}/${mockYogaSession.teacher_id.toString()}`);
    getTeacherReq.flush(mockTeacher);

    expect(spyFetchSession).toHaveBeenCalled();
    expect(component.session).toEqual(mockYogaSession);
    expect(component.isParticipate).toBe(false);
    expect(component.teacher).toEqual(mockTeacher);
  })

});

