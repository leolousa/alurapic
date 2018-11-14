import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { // Carregamento Lazy do modulo Home
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
      path: 'user/:userName',
      component: PhotoListComponent,
      resolve: {
          photos: PhotoListResolver
      },
      data: {
          title: 'Timeline'
      }
  },
  {
      path: 'p/add',
      component: PhotoFormComponent,
      canActivate: [AuthGuard],
      data: {
          title: 'Photo Upload'
      }
  },
  {
    path: 'p/:photoId',
    component: PhotoDetailsComponent,
    data: {
        title: 'Photo detail'
    }
  },
  {
    path: 'error',
    component: GlobalErrorComponent,
    data: {
        title: 'Error'
    }
},
  {
      path: 'not-found',
      component: NotFoundComponent,
      data: {
          title: 'Not found'
      }
  },
  {
      path: '**',
      redirectTo: 'not-found'
  }
];

@NgModule({
    imports: [
        // Hash definido pelo objeto useHash, esta forma é a que tem maior compatibilidade entre os navegadores
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
