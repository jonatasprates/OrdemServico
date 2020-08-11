import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [

  { path: 'site',
    loadChildren: () => import('./site/site.module')
    .then(m => m.SiteModule)
  },

  { path: 'administrativo',
    loadChildren: () => import('./administrativo/administrativo.module')
    .then(m => m.AdministrativoModule)
  },

  { path: 'autenticacao',
    loadChildren: () => import('./autenticacao/autenticacao.module')
    .then(m => m.AutenticacaoModule)
  },

//  { path: '**', component: PagenotfoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
