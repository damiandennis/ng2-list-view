import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";

@Component({
    moduleId: module.id,
    selector: "c-search",
    templateUrl: "search.component.html"
})
export class SearchComponent implements OnInit {

    @Output() @Input() public searchTerm = new EventEmitter();
    @Input() public placeholder: string = "Search";
    protected classes: Array<string> = ["form-control"];
    protected searchInputControl: FormControl = new FormControl();

    ngOnInit() {
        // Subscribe to and debounce form control, emitting search results
        this.searchInputControl
            .valueChanges
            .debounceTime(500)
            .subscribe((term: string) => {
                this.searchInputControl.setValue(term, { emitEvent: false });
                this.searchTerm.emit(term);
            });
    }

    public clearSearchTerm(emit: boolean = false) {
        this.searchInputControl.setValue("", {emitEvent: emit});
    }

}
