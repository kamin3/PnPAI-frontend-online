import { AbstractControl } from '@angular/forms';

export function ValidateBusinessEmail(control: AbstractControl) {
    let value = control.value;
    if (value && value.split("@")[1]) {
        let invalid_domains = ["gmail", "hotmail", "yahoo", "outlook"];
        if (invalid_domains.includes(value.split("@")[1].split(".")[0]))
            return { invalidBusinessEmail: true };
    }
    return null;
}