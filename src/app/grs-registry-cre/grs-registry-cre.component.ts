import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { GlobalVar } from '../app.component';


import * as sha512 from 'js-sha512';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface registrySch {
  [key: string]: unknown;
  _id: string
  first_name: string
  last_name: string
  email: string
  address: string
  zip: Number
  telNo: Number
  registrationDate: Date
  custId: string
  pwd: string
  loginCount: Number
}

const today = new Date();
const hallo:any= " "
export const GrsRegistrySch: registrySch = {
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  zip: 0,
  telNo: 0,
  registrationDate: today,
  custId: "",
  pwd: "",
  loginCount: 21


}

let GrsRegistryInput: registrySch = GrsRegistrySch


@Component({
  selector: 'app-grs-registry-cre',
  templateUrl: './grs-registry-cre.component.html',
  styleUrls: ['./grs-registry-cre.component.css'],
  host: { class: '../../styles.css' }
})
export class GrsRegistryCreComponent implements OnInit {

  form = new FormGroup({
    registriesFormArray: new FormArray([
    ]),
  });


  get registriesFormArray(): FormArray {
    return this.form.get('registriesFormArray') as FormArray;
  }

  today = new Date();

  GrsRegistryFormGroup = new FormGroup({
    registries: new FormArray([new FormControl(GrsRegistrySch)
    ]),
  });

  get registries(): FormArray {
    return this.GrsRegistryFormGroup.get('registries') as FormArray;
  }

  email = ' ';
  mpwd = " ";

  mloginCount = 0
  mregistrationDate = new Date
  mcustId = "";
  styleExp = "black";
  dateCtrl="";

  @Input() GrsRegistryInput: registrySch = GrsRegistrySch
  @Input() GrsRegistryInputForm = this.form
  @Input() IsSelected: Boolean = false


  first_name_myError = false;
  last_name_myError = false;
  email_myError = false;
  address_myError = false;
  zip_myError = false;
  telNo_myError = false;
  registrationDate_myError = false;
  mpwd_myError = false;
  Message_myError = '';
  myError = false;
  readyToSave = false;
  saveSuccess = false;
  alertStyle = "alert-blank";
  alertStrongMessage = " ";
  alertMessage = " ";
  doAlert = false;


  mregistry = {
    first_name: "",
    last_name: "",
    email: "",
    zip: 0,
    address: "",
    telNo: 0,
    registrationDate: today,
    custId: "",
    pwd: "",
    loginCount: 0
  }





  create() {

    //create has id from date and email


/*
    var mmilisec = today.getTime().toString() + this.form.controls.registriesFormArray.value[3]

    var hashId = crypto.createHash('RSA-MD5').update(mmilisec).digest('hex');
    console.log("milisec:", mmilisec)
    console.log("hash:", hashId)
*/

var hashCustId = sha512.sha512_224(today.getTime().toString() + this.form.controls.registriesFormArray.value[3])
var hashPassWd = sha512.sha512_224(this.form.controls.registriesFormArray.value[9])



    this.mregistry['first_name'] = this.form.controls.registriesFormArray.value[1]
    this.mregistry['last_name'] = this.form.controls.registriesFormArray.value[2]
    this.mregistry['email'] = this.form.controls.registriesFormArray.value[3]
    this.mregistry['loginCount'] = 2 // has to be set by the increment of last logincount
    this.mregistry['zip'] = this.form.controls.registriesFormArray.value[4]
    this.mregistry['address'] = this.form.controls.registriesFormArray.value[5]
    this.mregistry['telNo'] = this.form.controls.registriesFormArray.value[6]
    this.mregistry['registrationDate'] = this.form.controls.registriesFormArray.value[8]
    this.mregistry['custId'] = hashCustId  // has to be set by the increment of last custId
    this.mregistry['pwd'] = hashPassWd



    this.http.post<object>
      (GlobalVar.RestApiUrl + '/app/create', this.mregistry, httpOptions).subscribe()
    this.saveSuccess = true
    this.doAlert = true;
    this.alertMessage = "Your data saved.";
    this.alertStyle = "col-12 alert alert-success"
    this.alertStrongMessage = "Success! "
  }

  updateRec() {
    var hashCustId = sha512.sha512_224(today.getTime().toString() + this.form.controls.registriesFormArray.value[3])
    var hashPassWd = sha512.sha512_224(this.form.controls.registriesFormArray.value[9])
    console.log("Passwd",this.form.controls.registriesFormArray.value[9])
    console.log("HASHPWD:",hashPassWd);

    const mQueryString = '?_id=' + this.form.controls.registriesFormArray.value[0]
    this.readyToSave = true

    this.mregistry['first_name'] = this.form.controls.registriesFormArray.value[1]
    this.mregistry['last_name'] = this.form.controls.registriesFormArray.value[2]
    this.mregistry['email'] = this.form.controls.registriesFormArray.value[3]
    this.mregistry['loginCount'] = 2 // has to be set by the increment of last logincount
    this.mregistry['zip'] = this.form.controls.registriesFormArray.value[4]
    this.mregistry['address'] = this.form.controls.registriesFormArray.value[5]
    this.mregistry['telNo'] = this.form.controls.registriesFormArray.value[6]
    this.mregistry['registrationDate'] = this.form.controls.registriesFormArray.value[8]
    
    //this.mregistry['pwd'] = this.form.controls.registriesFormArray.value[9]
    this.mregistry['pwd'] = hashPassWd

    this.http.post<object>
      (GlobalVar.RestApiUrl + '/app/update' + mQueryString, this.mregistry, httpOptions).subscribe()




  }

  pwdControl() {

    this.mpwd = this.form.value.registriesFormArray[9]
    
    this.styleExp = "black"
    this.myError = false;
    this.mpwd_myError = false;
    this.Message_myError = "";
    this.readyToSave = true;



    if (this.mpwd.length < 8) {
      this.mpwd_myError = true;
      this.readyToSave = false;
      this.Message_myError = "< 8 character "
    }
    let regex = /[0-9]/g

    if (this.mpwd.search(regex) === -1) {
      this.mpwd_myError = true;
      this.readyToSave = false;
      this.Message_myError = this.Message_myError + ",no numeric char "
    }

    regex = /[A-Z]/g

    if (this.mpwd.search(regex) === -1) {
      this.mpwd_myError = true;
      this.readyToSave = false;
      this.Message_myError = this.Message_myError + ", no uppercase char"
    }

    regex = /['!%/=()?:,.<>#@&]/g

    if (this.mpwd.search(regex) === -1) {
      this.mpwd_myError = true;
      this.readyToSave = false;
      this.Message_myError = this.Message_myError + ", no special char"
    }


    if (this.mpwd_myError) {
      this.alertMessage = this.Message_myError
      this.alertStyle = "col-12 alert alert-danger"
      this.alertStrongMessage = "Warning! "
    }
    else {
      this.alertStyle = "col-12 alert alert-blank";
      this.alertStrongMessage = " ";
      this.alertMessage = " ";
      this.readyToSave = true
    }
  }

  NameControll() {
    this.alertMessage = "Please type your name.";
    this.alertStyle = "col-12 alert alert-warning"
    this.alertStrongMessage = "Warning! "


  }

  EmailControll() {

    let regex = /@/g
    this.email = this.form.controls.registriesFormArray.value[3]


    if (this.email.length < 5 || this.email.search(regex) === -1) {

      this.alertMessage = "Please type a valid email address p.e johnsmith@universum.com"
      this.alertStyle = "col-12 alert alert-danger"
      this.alertStrongMessage = "Warning! "
    }
    else {
      this.alertStyle = "col-12 alert alert-blank";
      this.alertStrongMessage = " ";
      this.alertMessage = " ";
    }

  }

  ZipControll() {


  }

  TelControll() {

  }

  DateControll() {
    this.dateCtrl=this.form.controls.registriesFormArray.value[8]
console.log("DateFormcontr",this.dateCtrl)
  }




  constructor(private http: HttpClient,) { }

  ngOnInit(): void {

    for (const [key, values] of Object.entries(GrsRegistrySch)) {

      this.registriesFormArray.push(new FormControl(GrsRegistrySch[key]));
    }


  }
  ngAfterViewChecked(): void {



  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.




    if (this.IsSelected) {

      this.form.patchValue(this.GrsRegistryInputForm.value);
      this.IsSelected = false

      this.pwdControl()

    }


  }



}
