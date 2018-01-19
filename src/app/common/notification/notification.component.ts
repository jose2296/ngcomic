import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../_services/notification.service';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  visible: boolean;

  constructor(private notificationService: NotificationService) {
    this.notificationService.evento.subscribe(() => {
      this.activateNotification();
    });
  }

  ngOnInit() {
    this.visible = false;
  }

  activateNotification() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 500);
  }

  funcion() {
    console.log(this.visible);
  }

}
