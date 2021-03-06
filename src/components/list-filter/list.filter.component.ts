import {Component, Input, OnInit, EventEmitter, ViewChildren, QueryList} from "@angular/core";
import {ICheckDirective} from "../../directives/icheck.directive";
import * as _ from "lodash";

@Component({
    selector: "c-list-filter",
    templateUrl: "list.filter.component.html"
})
export class ListFilterComponent implements OnInit {

    @Input() public title: string = "";
    @Input() public name: string = "";
    @Input() public items: Array<any> = [];
    @Input() public displayName: string = "label";
    @Input() public value: string = "value";
    @Input() public dataService: {
        getFilters: () => Array<any>,
        setParam: (name: string, filters: any) => any,
        fetchAll: (id?: any, payloadOnly?: boolean) => any
    };
    @Input() public checkedItems: any = {};
    @Input() public filterEmitter: EventEmitter<any>;
    @ViewChildren(ICheckDirective) public checkboxes: QueryList<ICheckDirective>;
    public itemsActive: number = 0;
    public timeout: any;
    public menuShown: boolean = false;

    public ngOnInit() {

        // If data is specified and items is empty fetch and fill.
        if (this.dataService) {
            this.dataService
                .fetchAll()
                .subscribe((data: any) => {
                    this.items = data.payload;
                });
        }
    }

    public reset() {
        this.itemsActive = 0;
        this.checkedItems = {};
        this.checkboxes.forEach((item) => {
            item.unCheck();
        });
    }

    /**
     * When a filter is made active or deactivated.
     *
     * @param name The name of the item.
     * @param event The filter returned.
     */
    public rowChecked(name: string, event: Event) {
        this.checkedItems[name] = event;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            let value = Object.keys(_.pickBy(<any>this.checkedItems, (value, key: any) => {
                return value;
            }));
            this.filterEmitter.emit({
                name: this.name,
                value: value,
                operator: "IN"
            });
            this.itemsActive = value.length;
        }, 1000);

    }

    public toggleClickMenu(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        this.menuShown = !this.menuShown;
    }

    public closeMenu(e: Event) {
        this.menuShown = false;
    }

    public showDropDown() {
        return this.menuShown ? "block" : "hide";
    }

}
