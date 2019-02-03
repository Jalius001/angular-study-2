import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {IndexedElement, User} from '../../core/user';
import { take, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UsersService]
})
export class UserListComponent implements OnInit {

  private maxUsers = 3;
  @Input()
  public users: User[] = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.refreshUsers();
  }

  deleteUser(event: IndexedElement<User>) {
    this.refreshUser(event.index);
  }

  refreshUser(pos: number) {
    if (pos >= this.users.length || pos < 0) {
      return;
    }
    this.usersService.getUsers().pipe(take(1)).subscribe( user => {
      console.log(`Retrieved user: ${user.name}`);
      this.users[pos] = user;
    });
  }
  refreshUsers(event?: any) {
    console.log(event);
    this.usersService.getUsers().pipe(take(this.maxUsers), toArray()).subscribe( arr => {
      this.users = [...arr];
    });
  }
}
