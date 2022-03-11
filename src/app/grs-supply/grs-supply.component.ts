import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { QuestionBase } from './question-base';
import { DynamicFormComponent,payLoad, form } from './dynamic-form.component'
import { Observable, Subscriber } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-grs-supply',
  templateUrl: './grs-supply.component.html',
  providers:  [QuestionService],
  styleUrls: ['./grs-supply.component.css'],
  host: { class: '../../styles.css' }
})
export class GrsSupplyComponent  {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  

  ngOnInit(): void {
    
    
  }

  ngOnDestroy() {
    
  }

  saveClicked() {

    this.questions$.subscribe(x=>{console.log("subscribe",x)})
    console.log("clickedPl",payLoad)
      
    }

  

}
export class UsernameValidator {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
      if((control.value as string).indexOf(' ') >= 0){
        
          return {cannotContainSpace: true}
      }

     // console.log("mycontroll",control.value)

      return null;
  }
}
