import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { of } from 'rxjs';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        HttpClientModule,
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
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
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Unit
  it('should go back in history when back is called', () => {
    const spy = jest.spyOn(window.history, 'back');

    component.back();

    expect(spy).toHaveBeenCalled();
  })



  it('should delete session when delete is called', () => {
    const router = TestBed.inject(Router);
    const spyNavigate = jest.spyOn(router, "navigate");
    component.delete();
    // tick();
    expect(mockSessionApiService.delete).toHaveBeenCalledWith(component.sessionId);
    expect(spyNavigate).toHaveBeenCalled();
  });


  it('should call participate when participate is called', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');
    component.participate();
    expect(mockSessionApiService.participate).toHaveBeenCalledWith(component.sessionId, component.userId);
    expect(spyFetchSession).toHaveBeenCalled();
  })

  it('should call unParticipate when unParticipate is called', () => {
    const spyFetchSession = jest.spyOn(component as any, 'fetchSession');
    component.unParticipate();
    expect(mockSessionApiService.unParticipate).toHaveBeenCalledWith(component.sessionId, component.userId);
    expect(spyFetchSession).toHaveBeenCalled();
  })

});

