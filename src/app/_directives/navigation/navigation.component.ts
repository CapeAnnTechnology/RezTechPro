import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../_models';
import { UserService } from '../../_services';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
 users: User[] = [];

 constructor(private userService: UserService) { }

 ngOnInit() {
  this.loadAllUsers();
 }

 private loadAllUsers() {
  this.userService.getUsers(10).pipe(first()).subscribe(users => {
  this.users = users;
 });
 }

}
