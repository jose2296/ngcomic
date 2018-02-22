import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../_services/notification.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    config: {};

    constructor(private notificationService: NotificationService) {
        // Inicializa los parametros de la notificacion
        this.notificationService.event.subscribe((notification) => {
            this.config = notification.config;
            this.activateNotification();
        });
    }

    ngOnInit() {
    }

    activateNotification() {
        swal(this.config).then((result) => {
            this.notificationService.returnValue(result.value);
        });

    }

}
