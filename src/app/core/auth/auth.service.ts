import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { environment } from './../../../environments/environment.prod';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root' // Fica disponível para totos os módulos injetarem!
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  // Método que autentica o usuário
  authenticate(userName: string, password: string) {

    // Post que retorna no Headers o tokem enviado pela API
    return this.http
      .post(
        API + '/user/login',
        { userName, password },
        { observe: 'response' }
      )
      .pipe(tap(res => {
        // Acessa o token
        const authToken = res.headers.get('x-access-token');

        // Salva o token
        this.userService.setToken(authToken);

        console.log(authToken);
      }));

  }
}
