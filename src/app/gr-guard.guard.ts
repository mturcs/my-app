import { Injectable, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GrNavbarComponent } from './gr-navbar/gr-navbar.component'
import { GrsLoginComponent } from './grs-login/grs-login.component';
import { AppComponent,GlobalVar } from './app.component';



@Injectable({
  providedIn: 'root'

})

export class GrGuardGuard implements CanActivate, OnChanges {


GlobalLoggedInStatus=GlobalVar.LoggedInStatus

  @ViewChild(GrNavbarComponent, {static: false}) GrNavComp!: GrsLoginComponent 

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.logStat=this.GrNavComp.loggedIn
    //console.log("guarlogstat",this.logStat)

  }

  logStat="false"
  GuardAuthorized=false
  messages: any[] = [];


  constructor(
   

  ) {

//console.log("GUardGlobalVar",this.GlobalLoggedInStatus)

  }



  setGlobalValue(value: string) {
    // All components that are subscribed to the
    // messenger service receive the update

  }


  ngOnInit() {
    // this.messengerService.longInt$.subscribe(x=>{console.log("longInt",x)})
    //console.log("Oninit",this.messengerService.loggedIn)


  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    //console.log("loginstat",this.timeBeacon.loggedInUserName)
    //console.log("LOGGEDin", this.messengerService.loggedIn)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //authentication code here




    //this WORKS!!!
    console.log("canActivate",GlobalVar.LoggedInStatus,GlobalVar.TimedOut)

    
    if(GlobalVar.LoggedInStatus && !GlobalVar.TimedOut ) {this.GuardAuthorized=true}
    else(this.GuardAuthorized=false)

    return this.GuardAuthorized
  }



  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.


  }

  ngOnDestroy() {


  }


}
