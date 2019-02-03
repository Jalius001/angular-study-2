import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable} from 'rxjs';
import { User } from '../core/user';
import {tap, map, take, flatMap, mergeMap, mergeAll, merge, concat, concatMap, skip} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://api.github.com/users';
  private bunch = 30;
  private index = 0;
  private USERS: User[] = [
    {name: 'Ivan', description: 'Software engineer', avatarUrl: 'data:image/png;base64,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'},
    {name: 'Serj', description: 'Senior software engineer', avatarUrl: 'data:image/jpeg;base64,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'},
    {name: 'Oksana', description: 'Analist', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSeH29TqMqExFdZ3K_92R4S7LdPtsAF8atwkWr3-u1AneY7sDvg'},
    {name: 'Yulia', description: 'Accounter', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdSeH29TqMqExFdZ3K_92R4S7LdPtsAF8atwkWr3-u1AneY7sDvg'}
  ];

  constructor(private http: HttpClient) {}

  private composeUrl(): string {
    let url = this.baseUrl;
    if (this.index > 0) {
      url = url + '?since=' + this.index;
    }
    return url;
  }


  public getUsers(num: number = 3): Observable<User> {
    return this.http.get<any[]>(this.composeUrl()).pipe(
      tap(payload => {
        console.log(payload);
      }),
      concatMap(arr => from(arr)),
      skip(num % this.bunch),
      take(num),
      map(payload => {
        this.index++;
        return {
          name: payload.login,
          description: `Id ${payload.id}, Login ${payload.login}, Type ${payload.type}`,
          avatarUrl: payload.avatar_url
          } as User;
      }),
      tap(user => {
        console.log(`User name ${user.name}`);
      }),
    );
  }

  private *mockUserSource() {

    while (true) {
      if (this.index === this.USERS.length) {
        this.index = 0;
      }
      console.log(`Retrieved users[${this.index}]: ${this.USERS[this.index]}`);
      yield this.USERS[this.index++];
    }
  }
}
