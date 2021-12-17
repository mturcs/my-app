import { Component,OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Observable, Observer, fromEvent, merge, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-gr-navbar',
  templateUrl: './gr-navbar.component.html',
  styleUrls: ['./gr-navbar.component.css'],
})

@Injectable({
  providedIn: 'root',
})

export class GrNavbarComponent implements OnInit {

  loggedUserNameLocal: string = "NOT LOGGED IN"
  loggedInUserName: String = "Not logged in"
  loginStart = false
  logStat = "false"
  
  constructor(public route: ActivatedRoute) {}

  links = [
    { title: 'Create', fragment: 'cre' },
    { title: 'Update/Delete', fragment: 'rud' },
    { title: 'Add Item', fragment: 'rud' },
    { title: 'Store', fragment: 'store' }


    
  ];

  userName = "";
  user = ""
  timeoutRelayReload=true

  currentDate = 0
  currentTimeout = 0
  currentTime = 0
  currentTimeoutString = " "
  Timeout = Date.now()
  TimoutIntervalMillisec = 30000
  timeoutDateString = " "
  timeoutReached = false
  mdate = new Date()

  current_time = Math.floor(Date.now() / 1000)     // record epoch time

  keypressObservable = fromEvent(document, 'keypress')
  mouseclickObservable = fromEvent(document, 'click')
  mousemoveObservable = fromEvent(document, 'mousemove')

  timeoutEvent = merge(this.keypressObservable, this.mouseclickObservable, this.mousemoveObservable)





  timeoutObservable = this.timeoutEvent.subscribe(x => {



    this.currentDate = Date.now()
    this.currentTimeout = this.currentDate + this.TimoutIntervalMillisec
    this.Timeout = this.currentTimeout
    this.mdate = new Date(this.Timeout)
    this.timeoutDateString = this.mdate.toLocaleTimeString()

  })



  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => {
      observer.next(new Date().toLocaleString())
      this.timeoutReached = false
      

      if (Date.now() > this.Timeout){
        this.loggedInUserName = "Not logged in"
        this.timeoutReached = true
        

        
       observer.next("TIMEOUT")
      }
      
    }, 1000);
  });

  d = new Date();
  displayTime = this.d.getHours() + ":" + this.d.getMinutes() + ":" + this.d.getSeconds()


  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.timeoutObservable.unsubscribe
    
  }

  
  loggedInUser(message: String): void {
    this.loggedInUserName = message
  }

  loginButtonPressed() {
    console.log("loginButtonPressed")
    this.loginStart = true
  }
  

}

