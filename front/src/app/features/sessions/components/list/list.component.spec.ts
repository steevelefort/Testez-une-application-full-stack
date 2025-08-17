import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { Session } from '../../interfaces/session.interface';
import { SessionApiService } from '../../services/session-api.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  // Create an array of 5 sessions
  const mockSessions = [1, 2, 3, 4, 5].map(
    id =>
    ({
      id,
      name: 'Session ' + id,
      description: 'Session ' + id,
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatIconModule],
      providers: [{ provide: SessionService, useValue: mockSessionService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should load sessions at start', () => {
    const sessionApiService = TestBed.inject(SessionApiService);
    const httpController = TestBed.inject(HttpTestingController);

    const getReq = httpController.expectOne(`${sessionApiService['pathService']}`)
    getReq.flush(mockSessions);

    expect(component.sessions$).toBeInstanceOf(Observable<Session[]>);
    component.sessions$.subscribe(sessions => {
      expect(sessions).toEqual(mockSessions);
    })

  })

});







