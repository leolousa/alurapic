import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' }) // Um Service não precisa pertencer a um módulo se está anotado com providedIn
export class PlatformDetectorService { // Classe para detectar a plataforma em que o Angular está rodando
  constructor (
    @Inject(PLATFORM_ID) private plataformaId: string
  ) { }

  // Retorna se está no Browser ou não
  ehPlataformaBrowser() {
    return isPlatformBrowser(this.plataformaId);
  }
}
