import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpSentEvent, HttpRequest,
  HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

/**
 * Classe de interceptação das requisções para envio do token
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor( private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
      if (this.tokenService.hasToken()) {
        const token = this.tokenService.getToken();
        req = req.clone({
          setHeaders: { 'x-access-token': token }
        });
      }
      return next.handle(req);
  }

}
