import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTrace from 'stacktrace-js';
import { Router } from '@angular/router';

import { UserService } from '../../core/user/user.service';
import { ServerLogService } from './server-log.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector // Injetor do Angular para fazer Injeção de dependência no método
  ) {}

  handleError(error: any): void {
    console.log('Passei pelo handler!');

    /*
     INJEÇÃO DE DEPENDÊNCIA MANUAL: Para saber a rota atual que está sendo acessada e o usuário logado.

     Vimos que não é interessante injetarmos artefatos no constructor
     do nosso Global Errorhandler, pois o angular primeiro criará instâncias
     dessas dependências para depois injetá-las e, se algum erro acontecer durante a injeção
     nosso ErrorHandler não será capaz de tratá-lo. Nesse sentido, o ideal é injetar os artefatos no método.
    */
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);


    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = error.message ? error.message : error.toString();

    if (environment.production) { router.navigate(['/error']); }

    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');
        console.log('ERRO: ' + message);
        console.log('STACK TRACE: ' + stackAsString);
        console.log('Será enviado ao servidor');
        console.log({ message, url, userName: userService.getUserName(), stack: stackAsString });
        serverLogService.log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString
        }).subscribe(
          () => console.log('Error logged on server'),
          err => {
            console.log(err);
            console.log('Fail to send error log to server!');
          }
        );
      });
  }
}
