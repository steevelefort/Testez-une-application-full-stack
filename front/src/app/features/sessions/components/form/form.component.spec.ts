import { HttpClientModule } from '@angular/common/http';
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
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;
  let sessionApiService: SessionApiService

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
        RouterTestingModule,
        HttpClientModule,
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
  it('should create', () => {
    expect(component).toBeTruthy();
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

  const mockSessionService = {
    sessionInformation: {
      admin: false
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
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
