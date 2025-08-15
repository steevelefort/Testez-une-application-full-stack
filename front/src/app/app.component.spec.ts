import { HttpClientModule } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { Observable, of } from 'rxjs';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    $isLogged: jest.fn().mockReturnValue(of(true)),
    logOut: jest.fn()
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
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        // { provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call $isLogged on SessionService', () => {
    const result = component.$isLogged();
    expect(mockSessionService.$isLogged).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Observable);
  })

  // Unit
  it('should logout and navigate to home page', () => {
    const router = TestBed.inject(Router);
    const ngZone = TestBed.inject(NgZone);
    const navigateSpy = jest.spyOn(router, 'navigate');
    ngZone.run(() => {
      component.logout();
    })
    expect(mockSessionService.logOut).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  })

});
