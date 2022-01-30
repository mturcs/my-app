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

    const toDay = new Date

    const questionsOrig: QuestionBase<string>[] = [

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
        order: 1
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
        required: true,
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
    const questions: QuestionBase<string>[] = [

      

      new TextboxQuestion({
        key: 'suplierName',
        label: 'Suplier name',
        type: 'text',
        value: '',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'suplierAddress',
        label: 'Suplier address',
        required: true,
        type: 'text',
        order: 2
      }),
      new TextboxQuestion({
        key: 'registrationAddress',
        label: 'Registration date',
        required: true,
        type: 'date',
        order: 2
      }),
      new TextboxQuestion({
        key: 'color',
        label: 'color',
        required: true,
        type: 'color',
        order: 2
      }),

    ];


    return of(questions.sort((a, b) => a.order - b.order));
  }
  suplTest() {
    console.log("Hallo")
  }
  


}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/