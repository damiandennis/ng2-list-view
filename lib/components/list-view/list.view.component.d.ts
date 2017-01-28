import { EventEmitter, AfterContentInit } from "@angular/core";
import { QueryList, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApiFilterInterface } from "../../interfaces/api-filter.interface";
import { PaginationComponent } from "../pagination/pagination.component";
import { SearchComponent } from "../search/search.component";
import { CounterComponent } from "../counter/counter.component";
import { ListRowComponent } from "../list-row/list.row.component";
import { ListPreviewComponent } from "../list-preview/list.preview.component";
import { NotFoundComponent } from "../not-found/not.found.component";
import { NoResultsComponent } from "../no-results/no.results.component";
import { ClearFiltersComponent } from "../clear-filters/clear.filters.component";
import { ShowMoreComponent } from "../show-more/show.more.component";
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
export declare class ListViewComponent implements OnInit, AfterContentInit {
    dataService: {
        getFilters: () => Array<any>;
        setParam: (name: string, filters: any) => any;
    };
    changePageEmitter: EventEmitter<{}>;
    searchTerm: EventEmitter<{}>;
    filtersEmitter: EventEmitter<{}>;
    filterEmitter: EventEmitter<{}>;
    clearFiltersEmitter: EventEmitter<{}>;
    listPreviewVisibleEmitter: EventEmitter<{}>;
    activeRowEmitter: EventEmitter<{}>;
    loadMoreEmitter: EventEmitter<{}>;
    handleRequestErrorEmitter: EventEmitter<{}>;
    filters: Array<ApiFilterInterface>;
    currentPage: number;
    loading: boolean;
    pageCount: number;
    paginationComponent: QueryList<PaginationComponent>;
    searchComponent: SearchComponent;
    counterComponents: QueryList<CounterComponent>;
    listRowComponent: ListRowComponent;
    listPreviewComponent: ListPreviewComponent;
    notFoundComponent: NotFoundComponent;
    noResultsComponent: NoResultsComponent;
    clearFiltersComponent: QueryList<ClearFiltersComponent>;
    showMoreComponent: ShowMoreComponent;
    originalFilters: Array<ApiFilterInterface>;
    dataSource: Observable<any>;
    protected lastSearch: string;
    updating: boolean;
    /**
     * @inheritdoc
     */
    ngOnInit(): void;
    /**
     * Resets the page index back to zero.
     *
     * @param withRefresh whether to refresh or wait.
     */
    resetPageIndex(withRefresh?: boolean): void;
    /**
     * @inheritdoc
     */
    ngAfterContentInit(): void;
    /**
     * Refreshes the list.
     */
    refresh(): void;
    /**
     * Changes all filters.
     *
     * @param filters
     */
    replaceFilters(filters: Array<ApiFilterInterface>): void;
    /**
     * Makes sure that filter is unique. Updates existing if already exists.
     *
     * @param filter
     */
    applyUniqueFilter(filter: ApiFilterInterface): void;
    /**
     * Applys filters and update subscriptions.
     */
    applyFilters(append?: Boolean): void;
    /**
     * Clears all filters stored against this list view.
     *
     * @param clear
     */
    clearFilters(clear: boolean): void;
    /**
     * Syncs all data to child components
     */
    updateSubscriptions(append?: Boolean): void;
    /**
     * Initiates SearchComponent sub component.
     */
    private initSearchComponent();
    /**
     * Initiates ListRowComponent sub component.
     */
    private initListRowComponent(data, append?);
    /**
     * Initiates PaginationComponent sub component.
     */
    private initPaginationComponent(data);
    /**
     * Initiates CounterComponent sub component.
     */
    private initCounterComponent(data);
    /**
     * Checks if the current list has been filtered in any way.
     * @returns {boolean}
     */
    private isFiltered();
    /**
     * Initiates NotFoundComponent sub component.
     */
    private initNotFoundComponent(data);
    /**
     * Initiates NoResultsComponent sub component.
     */
    private initNoResultsComponent(data);
    /**
     * Initiates ClearFiltersComponent sub component.
     */
    private initClearFiltersComponent();
    /**
     * Initiates ListPreviewComponent sub component.
     */
    private initListPreviewComponent();
    /**
     * Initiates ShowMoreComponent sub component.
     * @param data
     */
    private initShowMoreComponent(data);
}
