import { OnInit, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/debounceTime";
export declare class SearchComponent implements OnInit {
    searchTerm: EventEmitter<{}>;
    placeholder: string;
    isCustom: boolean;
    protected classes: Array<string>;
    protected searchInputControl: FormControl;
    ngOnInit(): void;
    clearSearchTerm(emit?: boolean): void;
}
