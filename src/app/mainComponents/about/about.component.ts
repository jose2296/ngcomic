import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  valid(el): void {

    let element = (<HTMLInputElement>document.getElementById(el));
    let elementsRequired = document.getElementsByName('form1');
    let checkbox = (<HTMLInputElement>document.getElementById('check1'));
    let submit = (<HTMLInputElement>document.getElementById('send'));
    let disabledCheck;

    /*Agregar o quitar estilos a los imputs si el campo es valido*/
    if (element.checkValidity()) {
      element.classList.remove('is-invalid');
      element.classList.add('is-valid');
    } else {
      element.classList.add('is-invalid');
    }

    /*Recorre todos los elementos requeridos y si todos están llenos, se activa el checkbox*/
    for (let i = 0; i < elementsRequired.length; i++) {
      if ((<HTMLInputElement>elementsRequired[i]).value == '') {
        submit.disabled = true;
        checkbox.checked = false;
        disabledCheck = true;
        break;
      } else {
        disabledCheck = false;
      }
    }
    checkbox.disabled = disabledCheck;
  }

  /*Activa el input submit cuando se aceptan los terminos*/
  activeSubmit(): void {
    let check = (<HTMLInputElement>document.getElementById('check1'));
    let submit = (<HTMLInputElement>document.getElementById('send'));
    if (check.checked) submit.disabled = false; else submit.disabled = true;
  }


  // Funcion que se ejecuta al clicar en el submit y que alerta de que no esta disponible aun el formulario mediante el componente
  // notificacion.
  alertNotImplemented() {
    this.notificationService.triggerNotification({
      'type': 'warning',
      'message': 'This feature is not implemented yet',
      'duration': 5000
    });
  }

}
