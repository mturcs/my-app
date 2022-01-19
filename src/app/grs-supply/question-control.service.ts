import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};


    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });

/*
    questions.forEach(question => {
      group[question.key] = 'firstName' ? new FormControl(question.value || '', Validators.minLength(8))
        : new FormControl(question.value || '');
      
    });

    questions.forEach(question => {
      group[question.key] = 'hallo' ? new FormControl(question.value || '', Validators.minLength(3))
        : new FormControl(question.value || '');
      
    });
*/
    //new FormControl('firstName',Validators.pattern('HALLO'))

console.log("question",questions)
group["firstName"]= new FormControl('',Validators.minLength(5))
group["valami"]= new FormControl('',Validators.minLength(6))






    return new FormGroup(group);
  }
  myFunct() {
    console.log("HALLO")
  } 

}




/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/