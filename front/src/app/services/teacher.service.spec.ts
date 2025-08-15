import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { Observable, of } from 'rxjs';
import { Teacher } from '../interfaces/teacher.interface';

import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  let service: TeacherService;

  const mockHttpClient = {
    get: jest.fn().mockReturnValue(of(null)),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
      ]
    });
    service = TestBed.inject(TeacherService);
  });

  // Unit
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Unit
  it('should call http.get when all is called and return an Observable', () => {
    const result = service.all();
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${service['pathService']}`);
    expect(result).toBeInstanceOf(Observable<Teacher[]>);
  })


  // Unit
  it('should call http.get when detail is called and return an Observable', () => {
    const id = '1';
    const result = service.detail(id);
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${service['pathService']}/${id}`);
    expect(result).toBeInstanceOf(Observable<Teacher>);
  })
});
