import {Component, Input} from "@angular/core";

@Component({
    selector: "c-counter",
    templateUrl: "counter.component.html"
})
export class CounterComponent {
    @Input() start: number = 1;
    @Input() end: number = 1;
    @Input() total: number = 0;
    @Input() label: string = "";
}
