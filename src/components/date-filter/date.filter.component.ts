import {Component, Input, EventEmitter} from "@angular/core";

@Component({
    selector: "c-date-filter",
    templateUrl: "date.filter.component.html"
})
export class DateFilterComponent {

    @Input() public title: string;
    @Input() public name: string;
    public value: string = "";
    @Input() public filterEmitter: EventEmitter<any>;

    public changeValue(value: string) {
        this.value = value;
        this.filterEmitter.emit({
            name: this.name,
            value: value,
            operator: "="
        });
    }

}
