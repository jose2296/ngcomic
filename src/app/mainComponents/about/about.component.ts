import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    message: any;

    constructor() {
    }

    ngOnInit() {
        localStorage.setItem('filter', 'rate');
        localStorage.setItem('defaultPage', '1');
        localStorage.setItem('search', 'empty');
        this.message = '';
    }

    valid(el): void {

        const element = (<HTMLInputElement>document.getElementById(el));
        const elementsRequired = document.getElementsByName('form1');
        const checkbox = (<HTMLInputElement>document.getElementById('check1'));
        const submit = (<HTMLInputElement>document.getElementById('send'));
        let disabledCheck;

        /*Agregar o quitar estilos a los imputs si el campo es valido*/
        if (element.checkValidity()) {
            element.classList.remove('is-invalid');
            element.nextElementSibling.setAttribute('style', ' visibility:hidden');
            element.classList.add('is-valid');
        } else {

            element.classList.add('is-invalid');
            element.nextElementSibling.setAttribute('style', ' visibility:visible');

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
        const check = (<HTMLInputElement>document.getElementById('check1'));
        const submit = (<HTMLInputElement>document.getElementById('send'));
        if (check.checked) submit.disabled = false; else submit.disabled = true;
    }

    setCookie(cname, cvalue) {
        document.cookie = cname + '=' + cvalue + ';' + ';path=/';
    }

    // Funcion que se ejecuta al clicar en el submit y que alerta de que no esta disponible aun el formulario mediante el componente
    // notificacion.
    alertNotImplementedAnSetCookie() {
        if (localStorage.getItem('cookie') === 'true') {
            this.message = 'but we safe your data';
            this.setCookie('username', (<HTMLInputElement>document.getElementById('name')).value);
        }


        swal({
            type: 'info',
            title: 'This feature is not implemented yet ' + this.message + ', sorry 🙁',
            buttonsStyling: false,
            confirmButtonText: 'Okey',
            confirmButtonClass: 'btn btn-primary'
        });

    }

}
