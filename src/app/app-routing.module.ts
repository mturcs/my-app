import { GrsRegistryCreComponent } from './grs-registry-cre/grs-registry-cre.component';
import { GrsRegistryRudComponent } from './grs-registry-rud/grs-registry-rud.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { GrsLoginComponent } from './grs-login/grs-login.component';
import { GrGuardGuard } from './gr-guard.guard';



const routes: Routes = [
  { path: 'cre', component: GrsRegistryCreComponent  },
  { path: 'rud', component: GrsRegistryRudComponent, canActivate: [GrGuardGuard] },
  { path: 'login', component: GrsLoginComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],

  providers: [],
  exports: [RouterModule]
})



export class AppRoutingModule { }
export class AppModule { }

export class AppComponent {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    
    

  ) {

    




    }






  }
  


