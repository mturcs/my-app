import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';
import { kMaxLength } from 'buffer';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'},
          {key: 'valami', value: 'Valami'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        type: 'text',
        value: '',
        required: true,
        order: 1,
        event: 'updateValue',
        function: 'this.myFunct()'

      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        required: true,
        type: 'email',
        order: 2
      }),
      new TextboxQuestion({
        key: 'hallo',
        label: 'hallo',
        type: 'number',
        order: 0
      }),
      new TextboxQuestion({
        key: 'valami',
        label: 'valami',
        type: 'text',
        order: 3,
        required: true
      })

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
  suplTest() {
    console.log("Hallo")
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