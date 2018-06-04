import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: object[] = [];
 
  add(message: string) {
    var text = message;
  	var message = [];
  	message.text = text
  	message.style = "alert-primary"
    this.messages.push(message);
  }

  addWithStyle(message: string, style: string) {
    var text = message;
    var message = [];
  	message.text = text
  	message.style = style
    this.messages.push(message);
  }
 
  clear() {
    this.messages = [];
  }
}
