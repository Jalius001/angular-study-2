import { TestBed } from '@angular/core/testing';
import { take, toArray } from 'rxjs/operators';
import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it('should return at least 4 values', () => {
    const service: UsersService = TestBed.get(UsersService);
    service.getUsers().pipe(
      take(4),
      toArray()
    ).subscribe(arr => {
        expect(arr.length).toBeDefined();
        expect(arr.length).toEqual(4);
    });
  });
});
