import {Component} from "@angular/core";
import {Input} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "c-no-results",
    templateUrl: "no.results.component.html"
})
export class NoResultsComponent {
    @Input() classes: Object = "alert alert-warning text-center";
    @Input() show: boolean = false;
}
