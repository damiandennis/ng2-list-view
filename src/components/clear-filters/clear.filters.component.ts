import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Input} from "@angular/core";
import {ApiFilterInterface} from "../../interfaces/api-filter.interface";

@Component({
    selector: "c-clear-filters",
    templateUrl: "clear.filters.component.html"
})
export class ClearFiltersComponent {

    public filter: ApiFilterInterface;
    @Input() public clearFiltersEmitter: EventEmitter<boolean>;

    public clear() {
        this.clearFiltersEmitter.emit(true);
    }
}
