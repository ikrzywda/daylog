import { TestBed } from '@angular/core/testing';

import { TaskLogApiService } from './task-log-api.service';

describe('TaskLogApiService', () => {
  let service: TaskLogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLogApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
