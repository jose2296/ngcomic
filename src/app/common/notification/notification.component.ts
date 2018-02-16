import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../_services/notification.service';
import {logger} from 'codelyzer/util/logger';
import swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  visible: boolean;
  type: string;
  message: string;
  duration: number;

  constructor(private notificationService: NotificationService) {
    //Inicializa los parametros de la notificacion
    this.notificationService.event.subscribe((notification) => {
      this.type = notification.type;
      this.message = notification.message;
      this.duration = notification.duration;
      // this.activateNotification();
      swal('?Notification?');
    });
  }

  ngOnInit() {
    this.visible = false;
  }
  //@deprecated
  // Notificación antigua, usar la funcion swal en su lugar
  //funcion que muestra la notificacion
  activateNotification() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }

  funcion() {
    console.log(this.visible);
  }

}
