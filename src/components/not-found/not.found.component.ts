import {Component} from "@angular/core";
import {Input} from "@angular/core";

@Component({
    selector: "c-not-found",
    templateUrl: "not.found.component.html"
})
export class NotFoundComponent {
    @Input() classes: Object = "alert alert-warning text-center";
    @Input() show: boolean = false;
}
