import { Alert, AlertType } from './alert';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterRouteChenge = false;

  constructor(router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChenge) {
          this.keepAfterRouteChenge = false;
        } else {
          this.clear();
        }
      }
    });
  }

  success(message: string, keepAfterRouteChenge: boolean = false) {
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChenge);
  }

  warning(message: string, keepAfterRouteChenge: boolean = false) {
    this.alert(AlertType.WARNING, message, keepAfterRouteChenge);
  }

  danger(message: string, keepAfterRouteChenge: boolean = false) {
    this.alert(AlertType.DANGER, message, keepAfterRouteChenge);
  }

  info(message: string, keepAfterRouteChenge: boolean = false) {
    this.alert(AlertType.INFO, message, keepAfterRouteChenge);
  }



  private alert(alertType: AlertType, message: string, keepAfterRouteChenge: boolean) {
    this.keepAfterRouteChenge = keepAfterRouteChenge;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clear() {
    this.alertSubject.next(null);
  }
}
