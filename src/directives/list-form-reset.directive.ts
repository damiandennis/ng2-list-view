import {Directive, Input} from "@angular/core";
import {NgForm} from "@angular/forms";

@Directive({
    selector: "form[listResetForm]"
})
export class ListFormResetDirective {

  @Input('promptReset') reset: boolean = false;
  @Input('listResetForm') form: NgForm;

}
