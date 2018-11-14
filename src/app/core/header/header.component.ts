import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../user/user.service';
import { User } from '../user/user';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ap-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  // boa prática colocar o $ para indicar que é um Observable
  // No HTML usamos o pipe (user$ | async) para pegar o valor do Observable user$
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
