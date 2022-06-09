import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoModule } from './pages/demo/demo.module';

const routes: Routes = [
  { path: '', children:[
      {
        path:'demo',
        loadChildren: () => import('./pages/demo/demo.module').then(m => m.DemoModule)
      },
      {
        path:'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
