
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import * as sha512 from 'js-sha512';
import { registrySch, GrsRegistrySch } from '../grs-registry-cre/grs-registry-cre.component'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { GrNavbarComponent } from '../gr-navbar/gr-navbar.component';
import { GlobalVar } from '../app.component';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface loggedSession {
  cust_id: String,
  logged_in_time: Number,
  session_id: String,
  logged_in: Boolean
}

@Component({
  selector: 'app-grs-login',
  templateUrl: './grs-login.component.html',
  providers: [GrNavbarComponent]
})

export class GrsLoginComponent implements OnInit {

  closeResult = '';

  @Output() login: EventEmitter<String> = new EventEmitter<String>();
  @Output() unameEmitter: EventEmitter<String> = new EventEmitter<String>()

  loggedIn = "false"
  showMessage: String = " "
  
  loggedUserName: string = "Üres"
  loggedUserNameExp = "Üresexp"
  hashSessionId: String = " "
  hashPassWd: String = " "
  userName: String = " "
  invalidPwd: Boolean = false

  mresult: Array<registrySch> = []
  qvalue: Array<registrySch> = []
  myval: Array<registrySch> = []
  m: Number = 0

  loggedInRec: Array<loggedSession> = [
    {
      cust_id: " ",
      logged_in_time: 0,
      session_id: " ",
      logged_in: false
    }
  ]

  GrsRegistryFormSelected: registrySch = GrsRegistrySch

  uidCheck: Promise<Array<registrySch>> | null = null;


  myGroup = new FormGroup({
    UserName: new FormControl(),
    PassWord: new FormControl()
  });


  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private navbarcomp: GrNavbarComponent,

  ) {

    this.mresult = [
      GrsRegistrySch
    ]

    this.qvalue = [
      GrsRegistrySch
    ]

    this.myval = [
      GrsRegistrySch
    ]

  }

  ngOnInit(): void {
    this.loggedIn = "false"
    this.navbarcomp.time.subscribe(x => {
      if (x == "TIMEOUT") { this.loggedIn = "false"; GlobalVar.TimedOut = true; }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }



  createLoginRec(loggedInRec: Array<loggedSession>) {

    this.http.post<object>('http://localhost:3000/app/create/loginsession', this.loggedInRec, httpOptions).subscribe()
    //this.http.post<object>('/app/create/loginsession', this.loggedInRec, httpOptions).subscribe()

  }




  uidCheckPromise(uid: String) {
    let data: Array<registrySch>
    let mQuerystring = '?email=' + uid
    this.uidCheck = new Promise<Array<registrySch>>((resolve, reject) => {
      setTimeout(() => {
        let loginName = " "
        this.http.get<[registrySch]>
          ('https://localhost:3000/app/qemail/' + mQuerystring).subscribe(function (data) {
            //this.loginName = data[0].first_name + " " + data[0].last_name
            resolve(data)
            reject("DB unreachable")
          })
      }, 400)
    })
  }

  loginPressed() {

    this.hashPassWd = sha512.sha512_224(this.myGroup.controls.PassWord.value)
    this.hashSessionId = sha512.sha512_224(Math.floor(Date.now() / 1000).toString() +
      this.myGroup.controls.UserName.value)                         //create SessionID
    this.uidCheckPromise(this.myGroup.controls.UserName.value)
    this.uidCheck?.then((mvalue: Array<registrySch>) => {

      this.loggedInRec[0].cust_id = mvalue[0].custId
      this.loggedInRec[0].logged_in_time = Math.floor(Date.now() / 1000)     // record epoch time
      this.loggedInRec[0].session_id = this.hashSessionId
      this.loggedInRec[0].logged_in = true

      this.loggedUserName = mvalue[0].first_name + mvalue[0].last_name
      this.loggedUserNameExp = mvalue[0].first_name + mvalue[0].last_name
      this.userName = mvalue[0].first_name + mvalue[0].last_name



      if (this.hashPassWd == mvalue[0].pwd) {
        // PWD OK
        this.invalidPwd = false
        this.createLoginRec(this.loggedInRec)
        this.modalService.dismissAll()
        this.loggedIn = "true"
        GlobalVar.LoggedInStatus = true
        GlobalVar.TimedOut = false
        this.login.emit(this.userName);
        //this.unameEmitter.emit("Welcome! "+this.userName)
      }
      else {
        // Invalid PWD
        //console.log("INVALID PWD")
        this.invalidPwd = true
        this.loggedIn = "false"
        GlobalVar.LoggedInStatus = false
      }
    })
  }

  logoutPressed() {
    this.loggedIn = "false"
    this.login.emit("Logged Out");
    GlobalVar.LoggedInStatus = false
    location.reload()
    this.navbarcomp.time.pipe(mapTo("LOGOUT"))
  }

  cancelPressed() {

  }


  onSubmit() {
    console.log("hello CHANGED")
  }

  mywait() {
    console.log("WAIT")
  }






}










