import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { storeSch } from '../grs-store/grs-store.component'
import { FormControl, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVar } from '../app.component';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Component({
  selector: 'app-grs-store-rud',
  templateUrl: './grs-store-rud.component.html',
  styleUrls: ['./grs-store-rud.component.css']
})
export class GrsStoreRudComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
  ) {
    this.mres = [
      storeSch
    ]


  }
  closeResult = '';
  mStat = true

  StoreFormSelected: storeSch = storeSch
  StoreFormHovered: storeSch = storeSch
  mres: Array<storeSch>

  mstore = {
    article_id: 0,
    supplier_id: 0,
    article_name: " ",
    article_size: " ",
    articlequality: " ",
    measure: " "
  }

  styleExp = "orange";
  selectedName = "";
  selectedRow = 0;
  deleteItemId: storeSch["article_id"] = 0;
  selectedItemId = " ";
  Message_myError = '';
  myError = false;
  readyToSave = false;
  saveSuccess = false;
  alertStyle = "col-12 alert alert-blank";
  alertStrongMessage = " ";
  alertMessage = " ";
  doAlert = false;
  IsSelected = false;

  mStoreRud: storeSch = storeSch
  StoreFormGroup = new FormGroup({
    registries: new FormArray([new FormControl(storeSch)
    ]),
  });

  form = new FormGroup({
    storeFormArray: new FormArray([ 
    ]),
  });

  get storeFormArray(): FormArray {
    return this.form.get('storeFormArray') as FormArray;
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


  rowSelected(x: storeSch, y: number) {

    this.mStoreRud = x
    this.StoreFormSelected = x

    this.deleteItemId = x.article_id;

    this.selectedRow = y;
  

  
    this.IsSelected = true;
    



    this.form = new FormGroup({
      storeFormArray: new FormArray([
      ]),
    });


    for (const [key, values] of Object.entries(this.StoreFormSelected)) {



      this.storeFormArray.push(new FormControl(this.StoreFormSelected[key]));
    }

    



  }

  rowHovered(x: storeSch, y: number) {
    this.IsSelected = false;
    this.StoreFormHovered = x

  }

  deleteRec() {

    const mQueryString = '?_id=' + this.deleteItemId
    this.http.post<object>
      (GlobalVar.RestApiUrl + '/app/reg/delete' + mQueryString, httpOptions).subscribe()

  }



  ngOnInit(): void {
    this.mStat=GlobalVar.TimedOut

    this.http.get<any>

      (GlobalVar.RestApiUrl + '/app/store/read').subscribe(data => {
        this.mres = data
        console.log(this.mres)

      })


  }

}
