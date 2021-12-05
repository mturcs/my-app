import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { registrySch, GrsRegistrySch } from '../grs-registry-cre/grs-registry-cre.component'
import { FormControl, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVar } from '../app.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Component({
  selector: 'app-grs-registry-rud',
  templateUrl: './grs-registry-rud.component.html',
  styleUrls: ['./grs-registry-rud.component.css']
})

export class GrsRegistryRudComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private modalService: NgbModal,

    ) {

    
    
    this.mres = [
      GrsRegistrySch
    ]
    

  }
  closeResult = '';
mStat=true


  GrsRegistryFormSelected: registrySch = GrsRegistrySch
  GrsRegistryFormHovered: registrySch = GrsRegistrySch

  

  mres: Array<registrySch>
  
mregistry = {
    
  first_name: " ",
  last_name: " ",
  email: " ",
  loginCount: 0,
  address: " ",
  zip: 0,
  telNo: 0,
  registrationDate: new Date("2015-03-25"),
  custId: "",
  pwd: " "
}




  mloginCount = 0
  mregistrationDate = new Date
  mcustId = "";
  styleExp = "orange";
  selectedName = "";
  selectedRow = 0;
  deleteItemId = " ";
  selectedItemId = " ";

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
  alertStyle = "col-12 alert alert-blank";
  alertStrongMessage = " ";
  alertMessage = " ";
  doAlert = false;
  IsSelected = false;

  mRegistryRud: registrySch = GrsRegistrySch
  GrsRegistryFormGroup = new FormGroup({
    registries: new FormArray([new FormControl(GrsRegistrySch)
    ]),
  });

  form = new FormGroup({
    registriesFormArray: new FormArray([

      
    ]),
  });


  get registriesFormArray(): FormArray {
    return this.form.get('registriesFormArray') as FormArray;
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




  rowSelected(x: registrySch, y: number) {

    this.mRegistryRud = x


    this.deleteItemId = x._id;
    this.selectedRow = y;
    this.selectedItemId = x._id;

    
    this.selectedName = x.last_name;


    

    this.GrsRegistryFormSelected = x
    this.IsSelected = true;
    



    this.form = new FormGroup({
      registriesFormArray: new FormArray([
      ]),
    });


    for (const [key, values] of Object.entries(this.GrsRegistryFormSelected)) {



      this.registriesFormArray.push(new FormControl(this.GrsRegistryFormSelected[key]));
    }

    



  }

  rowHovered(x: registrySch, y: number) {
    this.IsSelected = false;
    this.GrsRegistryFormHovered = x

  }

  deleteRec() {

    const mQueryString = '?_id=' + this.deleteItemId
    this.http.post<object>
      (GlobalVar.RestApiUrl + '/app/delete' + mQueryString, httpOptions).subscribe()

  }

  

  


  ngOnInit(): void {

    this.mStat=GlobalVar.TimedOut

    this.http.get<any>

      (GlobalVar.RestApiUrl + '/app/read').subscribe(data => {
        this.mres = data
        // console.log(this.mres)

      })

  }


}
