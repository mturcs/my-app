import { GrsRegistryCreComponent } from './grs-registry-cre/grs-registry-cre.component';
import { GrsRegistryRudComponent } from './grs-registry-rud/grs-registry-rud.component';
import { GrsStoreComponent } from './grs-store/grs-store.component';
import { GrsSupplyComponent } from './grs-supply/grs-supply.component';
import { GrsStoreRudComponent } from './grs-store-rud/grs-store-rud.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { GrsLoginComponent } from './grs-login/grs-login.component';
import { GrGuardGuard } from './gr-guard.guard';



const routes: Routes = [
  { path: 'cre', component: GrsRegistryCreComponent  },
  //{ path: 'rud', component: GrsRegistryRudComponent, canActivate: [GrGuardGuard] },
  { path: 'rud', component: GrsRegistryRudComponent },
  { path: 'store', component: GrsStoreComponent, canActivate: [GrGuardGuard] },
  { path: 'store_upd', component: GrsStoreRudComponent },
  { path: 'login', component: GrsLoginComponent },
  { path: 'supply', component: GrsSupplyComponent }

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
  


