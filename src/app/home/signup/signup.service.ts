import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewUser } from './new-user';
import { environment } from './../../../environments/environment.prod';

const API = environment.ApiUrl;

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) {}

  // Testa assincronamente se o usuário digitado já existe
  checkUserNameTaken(userName: string) {

    return this.http.get(API + '/user/exists/' + userName);

  }

  signUp(newUser: NewUser) {
    return this.http.post(API + '/user/signup', newUser);
  }
}
