import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { GlobalVar } from '../app.component';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};





export interface storeSch {
  [key: string]: unknown;
  article_id: Number
  supplier_id: Number
  article_name: String
  article_size: String
  articlequality: String
  measure: String
}


export const storeSch: storeSch = {
  _id: "",
  article_id: 0,
  supplier_id: 0,
  article_name: "",
  article_size: "",
  articlequality: "",
  measure: ""
}

let StoreInput: storeSch = storeSch

const today = new Date();


@Component({
  selector: 'app-grs-store',
  templateUrl: './grs-store.component.html',
  styleUrls: ['./grs-store.component.css']
})
export class GrsStoreComponent implements OnInit {

  constructor(private http: HttpClient,) { }

  mres = [storeSch]

  /* typeahead */
  articleNameTypeahead = [storeSch.article_name]
  articleNameTypeaheadUniq = [storeSch.article_name]

  articleSizeTypeahead = [storeSch.article_size]
  articleSizeTypeaheadUniq = [storeSch.article_size]

  articleQualityTypeahead = [storeSch.articlequality]
  articleQualityTypeaheadUniq = [storeSch.articlequality]

  articleMeasureTypeahead = [storeSch.measure]
  articleMeasureTypeaheadUniq = [storeSch.measure]




  form = new FormGroup({
    storeFormArray: new FormArray([
    ]),
  });
  get storeFormArray(): FormArray {
    return this.form.get('storeFormArray') as FormArray;
  }

  StoreFormGroup = new FormGroup({
    store: new FormArray([new FormControl(storeSch)
    ]),
  });

  get store(): FormArray {
    return this.StoreFormGroup.get('store') as FormArray;
  }

  @Input() StoreInput: storeSch = storeSch
  @Input() StoreInputForm = this.form
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
  readyToSave = true;
  saveSuccess = false;
  alertStyle = "alert-blank";
  alertStrongMessage = " ";
  alertMessage = " ";
  doAlert = false;
  formvar = "article_id"

  mstore = {
    article_id: 0,
    supplier_id: 0,
    article_name: "",
    article_size: "",
    articlequality: "",
    measure: ""
  }

  public modelArticleName: any;
  public modelArticleSize: any;
  public modelArticleQuality: any;
  public modelArticleMeasure: any;

  /* typeahead */

  

  searchArticleName: OperatorFunction<String, readonly String[]> = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.articleNameTypeaheadUniq.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchArticleSize: OperatorFunction<String, readonly String[]> = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.articleSizeTypeaheadUniq.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchArticleQuality: OperatorFunction<String, readonly String[]> = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.articleQualityTypeaheadUniq.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    
  searchArticleMeasure: OperatorFunction<String, readonly String[]> = (text$: Observable<String>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.articleMeasureTypeaheadUniq.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  create() {
    this.mstore['article_id'] = this.form.controls.storeFormArray.value[1]
    this.mstore['supplier_id'] = this.form.controls.storeFormArray.value[2]
    this.mstore['article_name'] = this.form.controls.storeFormArray.value[3]
    this.mstore['article_size'] = this.form.controls.storeFormArray.value[4]
    this.mstore['articlequality'] = this.form.controls.storeFormArray.value[5]
    this.mstore['measure'] = this.form.controls.storeFormArray.value[6]
    
    this.http.post<object>
      (GlobalVar.RestApiUrl + '/app/store/create', this.mstore, httpOptions).subscribe()

  }

  updateRec() {
    const mQueryString = '?_id=' + this.form.controls.storeFormArray.value[0]
    console.log("key=",this.form.controls.storeFormArray.value[0])
    this.readyToSave = true
    this.mstore['article_id'] = this.form.controls.storeFormArray.value[1]
    this.mstore['supplier_id'] = this.form.controls.storeFormArray.value[2]
    this.mstore['article_name'] = this.form.controls.storeFormArray.value[3]
    this.mstore['article_size'] = this.form.controls.storeFormArray.value[4]
    this.mstore['articlequality'] = this.form.controls.storeFormArray.value[5]
    this.mstore['measure'] = this.form.controls.storeFormArray.value[6]
    this.http.post<object>
      (GlobalVar.RestApiUrl + '/app/store/update' + mQueryString, this.mstore, httpOptions).subscribe()


  }


  article_idcontroll() { }




  ngOnInit(): void {

    for (const [key, values] of Object.entries(storeSch)) {

      this.storeFormArray.push(new FormControl(storeSch[key]));
    }

    this.http.get<any>
      (
        GlobalVar.RestApiUrl + '/app/store/read').subscribe(data => {
          this.mres = data
          
          this.articleNameTypeahead = [];this.articleSizeTypeahead = []; this.articleQualityTypeahead = [] ; this.articleMeasureTypeahead = []

          this.mres.forEach(value => { this.articleNameTypeahead.push(value.article_name) })
          this.articleNameTypeaheadUniq = [...new Set(this.articleNameTypeahead)];
          
          this.mres.forEach(value => { this.articleSizeTypeahead.push(value.article_size) })
          this.articleSizeTypeaheadUniq = [...new Set(this.articleSizeTypeahead)];

          this.mres.forEach(value => { this.articleQualityTypeahead.push(value.articlequality) })
          this.articleQualityTypeaheadUniq = [...new Set(this.articleQualityTypeahead)];

          this.mres.forEach(value => { this.articleMeasureTypeahead.push(value.measure) })
          this.articleMeasureTypeaheadUniq = [...new Set(this.articleMeasureTypeahead)];

          console.log("op.func typeahead", this.articleNameTypeaheadUniq, this.articleSizeTypeaheadUniq
          ,this.articleQualityTypeaheadUniq,this.articleMeasureTypeaheadUniq)

          
        }
        ).unsubscribe






  }


  ngDoCheck(): void {
    if (this.IsSelected) {

      this.form.patchValue(this.StoreInputForm.value);
      this.IsSelected = false

    }


  }

}
