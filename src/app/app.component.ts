import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SignalRService } from './signalR.service';
import { SetLockInput } from './viewModel';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-signalr';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  ngOnInit(): void {
    // this.signalRService.messageReceived$.subscribe(message => {
    //   this.chatMessages = [...this.chatMessages, message];
    // });
  }

  constructor(private signalRService: SignalRService,
    private idle: Idle, private keepalive: Keepalive,
    private router: Router) {
      idle.setIdle(30);
      idle.setTimeout(30);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.';
        this.reset();
      });

      idle.onIdleStart.subscribe(() => {
          this.idleState = 'You\'ve gone idle!';
      });

      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        this.signalRService.sendClientMessage('idle timeout');
      });

      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!';
      });

      keepalive.interval(15);
      keepalive.onPing.subscribe(() => this.lastPing = new Date());

      this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  public onChatAppClick(): void {
    this.router.navigate(['chat']);
  }
  public onNotifyClick(): void {
    this.router.navigate(['loanlock']);
  }
}
