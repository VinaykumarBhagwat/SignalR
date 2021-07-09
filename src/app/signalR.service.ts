import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@aspnet/signalr';
import { environment } from '../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { SetLockInput } from './viewModel';

const WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS = 2000;

@Injectable({ providedIn: 'root' })
export class SignalRService {
  connectionEstablished$ = new BehaviorSubject<boolean>(false);
  messageReceived$ = new Subject<string>();

  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: string) {
    this.hubConnection.invoke('SendMessage', message);
  }

  sendClientMessage(message: string) {
    this.hubConnection.invoke('SendMessageToClient', message);
  }

  clearLoanLockUponClosing(loanNumber: string) {
    this.hubConnection.invoke('ClearLoanLockUponClosing', loanNumber);
  }

  public setLoanLock(lockInput: SetLockInput) {
    this.hubConnection.invoke('SetLoanLock', lockInput);
  }

  public chatAppMessage(userName: string, message: string) {
    this.hubConnection.invoke('SendUserChatMessage', userName, message);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.baseUrls + 'coolmessages', {
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build();
  }

  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    setTimeout(() => {
      this.hubConnection.start().then(
        () => {
          console.log('Hub connection started');
          this.connectionEstablished$.next(true);
        },
        error => console.error(error)
      );
    }, WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS);
  }

  private registerOnServerEvents(): void {

    this.hubConnection.on('Send', (data: any) => {
      this.messageReceived$.next(data);
    });

    this.hubConnection.onclose((error: Error) => {
      this.messageReceived$.next(error.message);
    });
  }
}
