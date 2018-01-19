import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

  evento = new EventEmitter();

  setVisible() {
    this.evento.emit();
  }

  constructor() {
  }

}
