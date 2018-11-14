import { User } from './user';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root'})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    // tslint:disable-next-line:no-unused-expression
    this.tokenService.hasToken() && this.decodeAndNotify(); // Verifica se tem token para pegar o token
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getUserName() {
    return this.userName;
  }

  logout() {
    this.tokenService.removeToken(); // Remove o token
    this.userSubject.next(null); // Apaga o nome do usuário
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();

    // Decodifica a parte do pyload do token
    const user = jwt_decode(token) as User; // Cast para User
    this.userName = user.name;
    this.userSubject.next(user);
  }
}
