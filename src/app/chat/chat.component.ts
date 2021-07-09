import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signalR.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  userName: string;
  message: string;
  public chatAppMessages: string[] = [];
  constructor(
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.signalRService.messageReceived$.subscribe(message => {
      this.chatAppMessages = [...this.chatAppMessages, message];
    });
  }

  sendChatMessage(): void {
    this.signalRService.chatAppMessage(this.userName, this.message);
  }

}
