import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class NotificationService {

  event = new EventEmitter();

  // Recibe como parametro un objeto que contiene el tipo y el mensaje de la notificacion, asi como la duracion antes de que este desaparezca.
  triggerNotification(notification) {
    this.event.emit(notification);
  }

  constructor() {
  }

}
