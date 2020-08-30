import { AbstractControl } from "@angular/forms";

export function lowerCaseValidator(control: AbstractControl) {

    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) { // se nao tiver em branco e nao comecar com minusculo e tiver numeros no final
        return { lowerCase: true };
    }
    return null;
}