import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { QuestionBase } from '../question-base';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from '../dynamic-form.component';
import { DynamicFormQuestionComponent } from '../dynamic-form-question.component';

@Component({
  selector: 'app-grs-supply',
  templateUrl: './grs-supply.component.html',
  providers:  [QuestionService],
  styleUrls: ['./grs-supply.component.css']
})
export class GrsSupplyComponent  {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  

  ngOnInit(): void {
  }

}
