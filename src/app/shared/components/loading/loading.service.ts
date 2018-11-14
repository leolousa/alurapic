import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingType } from './loading-type';
import { startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  loadingSubject = new Subject<LoadingType>();

  getLoading() {
    // Chama a emissão do observable com o padrão do LoadingType 'STOPPED'
    return this.loadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED));
  }

  start() {
    this.loadingSubject.next(LoadingType.LOADING);
  }

  stop() {
    this.loadingSubject.next(LoadingType.STOPPED);
  }
}
