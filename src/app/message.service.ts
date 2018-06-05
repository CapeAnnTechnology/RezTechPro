import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: object[] = [];
 
  add(message: string) {
    var style = "alert-primary";
    var messageArray = { text: message, style: style};
    this.messages.push(messageArray);
  }

  addWithStyle(message: string, style: string) {
    var messageArray = { text: message, style: style};
  	this.messages.push(messageArray);
  }
 
  clear() {
    this.messages = [];
  }
}
