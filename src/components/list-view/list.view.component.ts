import {Component, Input, EventEmitter, AfterContentInit, ContentChild, Output} from "@angular/core";
import {ContentChildren, QueryList, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ApiFilterInterface} from "../../interfaces/api-filter.interface";
import {PaginationComponent} from "../pagination/pagination.component";
import {SearchComponent} from "../search/search.component";
import {CounterComponent} from "../counter/counter.component";
import {ListRowComponent} from "../list-row/list.row.component";
import {ListPreviewComponent} from "../list-preview/list.preview.component";
import {NotFoundComponent} from "../not-found/not.found.component";
import {NoResultsComponent} from "../no-results/no.results.component";
import {ClearFiltersComponent} from "../clear-filters/clear.filters.component";
import {ShowMoreComponent} from "../show-more/show.more.component";

/**
 * This component is a container for managing list view components together.
 * Its purpose is to manage and disperse data from a single location making management easier.
 *
 * Basic Example Usage
 * -------------
 *
 * Component TS
 *
 * @Component({
 *    selector: 'c-my-component',
 *    template: `
 *        <c-list-view [dataService]="userService">
 *            <c-pagination></c-pagination>
 *            <c-list-row #list>
 *              <div *ngFor="let row of list.rows">
 *                {{row.firstName}}
 *              </div>
*             </c-list-row>
 *        </c-list-view>
 *    `,
 *
 * })
 * class MyComponent {
 *     constructor(public userService: UserService) {}
 * }
 *
 */
@Component({
    selector: "c-list-view",
    templateUrl: "list.view.component.html",

})
export class ListViewComponent implements OnInit, AfterContentInit {

    /*
     * Emitters for communication with child components.
     */
    @Input() public dataService: {
        getFilters: () => Array<any>,
        setParam: (name: string, filters: any) => any
    };
    @Input() public changePageEmitter = new EventEmitter();
    @Input() public searchTerm = new EventEmitter();
    @Input() public filtersEmitter = new EventEmitter();
    @Input() public filterEmitter = new EventEmitter();
    @Input() public clearFiltersEmitter = new EventEmitter();
    @Input() public listPreviewVisibleEmitter = new EventEmitter();
    @Input() public activeRowEmitter = new EventEmitter();
    @Input() public loadMoreEmitter = new EventEmitter();
    @Output("handleRequestError") public handleRequestErrorEmitter = new EventEmitter();
    public filters: Array<ApiFilterInterface> = [];
    public currentPage: number = 1;
    public loading: boolean = true;
    public pageCount: number;

    /*
     * Direct references to child components.
     */
    @ContentChildren(PaginationComponent) public paginationComponent: QueryList<PaginationComponent>;
    @ContentChild(SearchComponent) public searchComponent: SearchComponent;
    @ContentChildren(CounterComponent) public counterComponents: QueryList<CounterComponent>;
    @ContentChild(ListRowComponent) public listRowComponent: ListRowComponent;
    @ContentChild(ListPreviewComponent) public listPreviewComponent: ListPreviewComponent;
    @ContentChild(NotFoundComponent) public notFoundComponent: NotFoundComponent;
    @ContentChild(NoResultsComponent) public noResultsComponent: NoResultsComponent;
    @ContentChildren(ClearFiltersComponent) public clearFiltersComponent: QueryList<ClearFiltersComponent>;
    @ContentChild(ShowMoreComponent) public showMoreComponent: ShowMoreComponent;

    public originalFilters: Array<ApiFilterInterface> = [];
    public dataSource: Observable<any>;
    protected lastSearch: string = "";
    public updating = false;
    public activeID: number;

    /**
     * @inheritdoc
     */
    ngOnInit() {

        this.filters = this.dataService.getFilters();

        // Fetch original filters for reset.
        this.originalFilters = JSON.parse(JSON.stringify(this.filters));
        this.dataSource = this.dataService.setParam("filters", this.filters).fetchAll();

        // Subscription to page change triggered by `pagination` component
        this.changePageEmitter.subscribe((page: number) => {
            this.updating = true;
            this.dataSource = this.dataService.setParam("page", page).fetchAll();
            this.updateSubscriptions();
        });

        // Subscription to search term change triggered by `search` component
        this.searchTerm.subscribe((term: string) => {
            // Record last search
            this.lastSearch = term;
            // Reset pagination back to first page
            this.dataService.setParam("page", 1);

            // Add search term to filters array
            this.applyUniqueFilter({
                name: "searchField",
                value: term,
                operator: "="
            });

            // Reapply filters
            this.applyFilters();
        });

        // An event to change all filters.
        this.filtersEmitter.subscribe((filters: Array<ApiFilterInterface>) => {
            // Set all emitter filters to filter array
            this.filters = filters;
            // Reapply filters
            this.applyFilters();
        });

        this.filterEmitter.subscribe((filter: ApiFilterInterface) => {
            // Push emitted filter to filter array
            this.applyUniqueFilter(filter);
            // Reapply filters
            this.applyFilters();
        });

        // An event to clear all filters.
        this.clearFiltersEmitter.subscribe((clear: boolean) => {
            this.clearFilters(clear);
        });

        this.listPreviewVisibleEmitter.subscribe((hidden) => {
            this.listPreviewComponent.hidden = hidden;
            this.listRowComponent.previewHidden = hidden;
        });

        this.activeRowEmitter.subscribe((row) => {
            this.activeID = row[this.dataService.primaryKey()];
            this.listPreviewComponent.data = row;
        });

        this.loadMoreEmitter.subscribe(() => {
            if (this.currentPage !== this.pageCount) {
                this.dataService.setParam("page", ++this.currentPage);
                this.applyFilters(true);
            }
        });
    }

    /**
     * Resets the page index back to zero.
     *
     * @param withRefresh whether to refresh or wait.
     */
    public resetPageIndex(withRefresh = false) {
        this.currentPage = 1;
        this.dataService.setParam("page", 1);
        if (withRefresh) {
            this.refresh();
        }
    }

    /**
     * @inheritdoc
     */
    ngAfterContentInit() {
        // Sync data to child components
        this.updateSubscriptions();
    }

    /**
     * Refreshes the list.
     */
    public refresh(hidePreview: boolean = true) {
        this.updating = true;
        return this.updateSubscriptions(false, hidePreview);
    }

    /**
     * Changes all filters.
     *
     * @param filters
     */
    public replaceFilters(filters: Array<ApiFilterInterface>) {
        this.filters = filters;
        this.applyFilters();
    }

    /**
     * Makes sure that filter is unique. Updates existing if already exists.
     *
     * @param filter
     */
    applyUniqueFilter(filter: ApiFilterInterface) {
        let item = this.filters.findIndex((item: any): boolean => { return item.name === filter.name; });
        if (item === -1) {
            this.filters.push(filter);
        } else {
            this.filters[item] = filter;
        }
    }


    /**
     * Applys filters and update subscriptions.
     */
    public applyFilters(append: Boolean = false) {
        // Apply filters to data service
        this.updating = true;
        this.dataSource = this.dataService.setParam("filters", this.filters).fetchAll();
        this.updateSubscriptions(append);
    }

    /**
     * Clears all filters stored against this list view.
     *
     * @param clear
     */
    public clearFilters(clear: boolean) {

        this.currentPage = 1;
        this.dataService.setParam("page", this.currentPage);

        // Clear filters here (on the parent)
        this.filters = clear ? JSON.parse(JSON.stringify(this.originalFilters)) : this.filters;
        // Clear filters for `search` component
        if (this.searchComponent) {
            this.searchComponent.clearSearchTerm();
        }
        if (this.listFiltersComponent) {
            this.listFiltersComponent.forEach((component) => component.reset());
        }

        // Reapply filters
        this.applyFilters();
    }

    /**
     * Syncs all data to child components
     */
    public updateSubscriptions(append: Boolean = false, hidePreview: boolean = true) {
        return new Promise((resolve, reject) => {
            this.dataSource.subscribe(
                (data) => {
                    this.loading = false;
                    this.updating = false;
                    this.currentPage = data.meta.page;
                    this.pageCount = data.meta.pageCount;
                    this.initSearchComponent();
                    this.initListRowComponent(data, append);
                    this.initPaginationComponent(data);
                    this.initCounterComponent(data);
                    this.initNotFoundComponent(data);
                    this.initNoResultsComponent(data);
                    this.initClearFiltersComponent();
                    this.initListPreviewComponent(hidePreview);
                    this.initShowMoreComponent(data);
                    resolve(true);
                },
                (error) => {
                    this.handleRequestErrorEmitter.emit(error);
                    reject(error);
                }
            );
        });
    }

    /**
     * Initiates SearchComponent sub component.
     */
    private initSearchComponent(): void {
        // Data for `search` component
        if (this.searchComponent) {
            this.searchComponent.searchTerm = this.searchTerm;
        }
    }

    /**
     * Initiates ListRowComponent sub component.
     */
    private initListRowComponent(data: any, append: Boolean = false): void {
        // Data for `list-row` component
        if (this.listRowComponent) {
            this.listRowComponent.visibleEmitter = this.listPreviewVisibleEmitter;
            this.listRowComponent.dataEmitter = this.activeRowEmitter;
            if (append) {
                this.listRowComponent.rows = this.listRowComponent.rows.concat(data.payload);
            } else {
                this.listRowComponent.rows = data.payload;
            }
        }
    }

    /**
     * Initiates PaginationComponent sub component.
     */
    private initPaginationComponent(data: any): void {

        let page = parseInt(data.meta.page);
        let pageCount = parseInt(data.meta.pageCount);

        // Data for `pagination` component
        if (this.paginationComponent) {
            this.paginationComponent.forEach((component: PaginationComponent) => {
                component.changePageEmitter = this.changePageEmitter;
                component.page = page;
                component.pageCount = pageCount;
                component.pages = component.updatePagination();
            });
        }
    }

    /**
     * Initiates CounterComponent sub component.
     */
    private initCounterComponent(data: any): void {

        let page = parseInt(data.meta.page);
        let perPage = parseInt(data.meta.perPage);
        let totalCount = parseInt(data.meta.totalCount);

        let start = page * perPage - perPage + 1;
        let end = page * perPage;

        // Data for `counter` component
        if (this.counterComponents) {
            this.counterComponents.forEach((component: CounterComponent) => {
                component.start = start;
                component.end = end > totalCount ? totalCount : end;
                component.total = totalCount;
            });
        }
    }

    /**
     * Checks if the current list has been filtered in any way.
     * @returns {boolean}
     */
    private isFiltered() {
        let noFilters = JSON.stringify(this.filters) === JSON.stringify(this.originalFilters);
        return this.lastSearch.length !== 0 || !noFilters;
    }

    /**
     * Initiates NotFoundComponent sub component.
     */
    private initNotFoundComponent(data: any): void {
        // Data for `not-found` component
        if (this.notFoundComponent) {
            this.notFoundComponent.show = this.isFiltered() && data.payload.length === 0;
        }
    }

    /**
     * Initiates NoResultsComponent sub component.
     */
    private initNoResultsComponent(data: any): void {
        // Data for `no-results` component
        if (this.noResultsComponent) {
            this.noResultsComponent.show = data.payload.length === 0 && !this.isFiltered();
        }
    }

    /**
     * Initiates ClearFiltersComponent sub component.
     */
    private initClearFiltersComponent(): void {
        // Data for `clear-filters` component
        if (this.clearFiltersComponent) {
            this.clearFiltersComponent.forEach((component: any) => {
                component.clearFiltersEmitter = this.clearFiltersEmitter;
            });
        }
    }

    /**
     * Initiates ListPreviewComponent sub component.
     */
    private initListPreviewComponent(hidePreview: boolean = true): void {
        if (this.listPreviewComponent) {
            this.listPreviewComponent.visibleEmitter = this.listPreviewVisibleEmitter;
            this.listPreviewComponent.dataEmitter = this.activeRowEmitter;
            this.listPreviewVisibleEmitter.emit(hidePreview);
            if (this.activeID && !hidePreview) {
                let row = this.listRowComponent.rows.find((row: any) => {
                    if (row[this.dataService.primaryKey()] === this.activeID) {
                        return true;
                    }
                });
                if (row) {
                    this.listRowComponent.setActiveRow(row);
                }
            }
        }
    }

    /**
     * Initiates ShowMoreComponent sub component.
     * @param data
     */
    private initShowMoreComponent(data: any): void {
        if (this.showMoreComponent) {
            let page = parseInt(data.meta.page);
            let pageCount = parseInt(data.meta.pageCount);
            let totalCount = parseInt(data.meta.totalCount);
            this.showMoreComponent.loadMoreEmitter = this.loadMoreEmitter;
            this.showMoreComponent.moreResults = page !== pageCount && totalCount !== 0;

        }
    }
}
