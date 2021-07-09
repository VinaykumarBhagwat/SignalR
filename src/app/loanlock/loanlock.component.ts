import { Component, OnInit, HostListener } from '@angular/core';
import { SignalRService } from '../signalR.service';
import { SetLockInput } from '../viewModel';

@Component({
  selector: 'app-loanlock',
  templateUrl: './loanlock.component.html'
})
export class LoanlockComponent implements OnInit {
  chatMessages: string[] = [];
  public inputMessage: string;
  public loanNumber = '4028754';
  public userName: string;

  constructor(
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.signalRService.messageReceived$.subscribe(message => {
      this.chatMessages = [...this.chatMessages, message];
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.signalRService.clearLoanLockUponClosing(this.loanNumber);
  }

  public onClickNotify(): void {
    if (!this.inputMessage) {
      return;
    }
    this.signalRService.sendMessage(this.inputMessage);
  }

  public onSetLock(): void {
    const lockInput: SetLockInput = {
      LoanNumber: this.loanNumber,
      UserName: this.userName,
      SessionId: undefined,
      IsSandbox: undefined
    };
    this.signalRService.setLoanLock(lockInput);
  }

}
