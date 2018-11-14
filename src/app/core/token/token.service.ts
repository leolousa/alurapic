import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root' // Fica disponível para totos os módulos injetarem!
})
export class TokenService {

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
