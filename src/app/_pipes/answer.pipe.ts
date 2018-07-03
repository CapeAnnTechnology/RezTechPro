import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'answer'
})

export class AnswerPipe implements PipeTransform {
  transform( answer, args ) {
    const value = answer.toString().trim();

    if ( value == 'true' ) {
      return `<strong>Yes</strong>`;
    }else{
      return `<strong>No</strong>`;
    }
  }
}
