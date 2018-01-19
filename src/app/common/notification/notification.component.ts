import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  visible: boolean;

  constructor() {
  }

  ngOnInit() {
    this.visible = false;
    this.activateNotification();
  }

  activateNotification() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 2000);
  }

}
