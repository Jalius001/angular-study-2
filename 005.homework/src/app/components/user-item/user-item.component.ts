import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IndexedElement, User} from '../../core/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Output() userDeletedEvent = new EventEmitter<IndexedElement<User>>();
  @Input()
  public user: User;
  @Input()
  public index: number;

  constructor() { }

  ngOnInit() {
  }

  deleteUser(event: any) {
    console.log(event);
    this.userDeletedEvent.emit({index: this.index, item: this.user });
  }

  getUserAvatar() {
    return `url(${this.user.avatarUrl})`;
  }
}
