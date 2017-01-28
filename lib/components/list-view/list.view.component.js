"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var pagination_component_1 = require("../pagination/pagination.component");
var search_component_1 = require("../search/search.component");
var counter_component_1 = require("../counter/counter.component");
var list_row_component_1 = require("../list-row/list.row.component");
var list_preview_component_1 = require("../list-preview/list.preview.component");
var not_found_component_1 = require("../not-found/not.found.component");
var no_results_component_1 = require("../no-results/no.results.component");
var clear_filters_component_1 = require("../clear-filters/clear.filters.component");
var show_more_component_1 = require("../show-more/show.more.component");
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
var ListViewComponent = (function () {
    function ListViewComponent() {
        this.changePageEmitter = new core_1.EventEmitter();
        this.searchTerm = new core_1.EventEmitter();
        this.filtersEmitter = new core_1.EventEmitter();
        this.filterEmitter = new core_1.EventEmitter();
        this.clearFiltersEmitter = new core_1.EventEmitter();
        this.listPreviewVisibleEmitter = new core_1.EventEmitter();
        this.activeRowEmitter = new core_1.EventEmitter();
        this.loadMoreEmitter = new core_1.EventEmitter();
        this.handleRequestErrorEmitter = new core_1.EventEmitter();
        this.filters = [];
        this.currentPage = 1;
        this.loading = true;
        this.originalFilters = [];
        this.lastSearch = "";
        this.updating = false;
    }
    /**
     * @inheritdoc
     */
    ListViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filters = this.dataService.getFilters();
        // Fetch original filters for reset.
        this.originalFilters = JSON.parse(JSON.stringify(this.filters));
        this.dataSource = this.dataService.setParam("filters", this.filters).fetchAll();
        // Subscription to page change triggered by `pagination` component
        this.changePageEmitter.subscribe(function (page) {
            _this.dataSource = _this.dataService.setParam("page", page).fetchAll();
            _this.updateSubscriptions();
        });
        // Subscription to search term change triggered by `search` component
        this.searchTerm.subscribe(function (term) {
            // Record last search
            _this.lastSearch = term;
            // Reset pagination back to first page
            _this.dataService.setParam("page", 1);
            // Add search term to filters array
            _this.applyUniqueFilter({
                name: "searchField",
                value: term,
                operator: "="
            });
            // Reapply filters
            _this.applyFilters();
        });
        // An event to change all filters.
        this.filtersEmitter.subscribe(function (filters) {
            // Set all emitter filters to filter array
            _this.filters = filters;
            // Reapply filters
            _this.applyFilters();
        });
        this.filterEmitter.subscribe(function (filter) {
            // Push emitted filter to filter array
            _this.applyUniqueFilter(filter);
            // Reapply filters
            _this.applyFilters();
        });
        // An event to clear all filters.
        this.clearFiltersEmitter.subscribe(function (clear) {
            _this.clearFilters(clear);
        });
        this.listPreviewVisibleEmitter.subscribe(function (hidden) {
            _this.listPreviewComponent.hidden = hidden;
            _this.listRowComponent.previewHidden = hidden;
        });
        this.activeRowEmitter.subscribe(function (row) {
            _this.listPreviewComponent.data = row;
        });
        this.loadMoreEmitter.subscribe(function () {
            if (_this.currentPage !== _this.pageCount) {
                _this.dataService.setParam("page", ++_this.currentPage);
                _this.applyFilters(true);
            }
        });
    };
    /**
     * Resets the page index back to zero.
     *
     * @param withRefresh whether to refresh or wait.
     */
    ListViewComponent.prototype.resetPageIndex = function (withRefresh) {
        if (withRefresh === void 0) { withRefresh = false; }
        this.currentPage = 1;
        this.dataService.setParam("page", 1);
        if (withRefresh) {
            this.refresh();
        }
    };
    /**
     * @inheritdoc
     */
    ListViewComponent.prototype.ngAfterContentInit = function () {
        // Sync data to child components
        this.updateSubscriptions();
    };
    /**
     * Refreshes the list.
     */
    ListViewComponent.prototype.refresh = function () {
        this.updateSubscriptions();
    };
    /**
     * Changes all filters.
     *
     * @param filters
     */
    ListViewComponent.prototype.replaceFilters = function (filters) {
        this.filters = filters;
        this.applyFilters();
    };
    /**
     * Makes sure that filter is unique. Updates existing if already exists.
     *
     * @param filter
     */
    ListViewComponent.prototype.applyUniqueFilter = function (filter) {
        var item = this.filters.findIndex(function (item) { return item.name === filter.name; });
        if (item === -1) {
            this.filters.push(filter);
        }
        else {
            this.filters[item] = filter;
        }
    };
    /**
     * Applys filters and update subscriptions.
     */
    ListViewComponent.prototype.applyFilters = function (append) {
        if (append === void 0) { append = false; }
        // Apply filters to data service
        this.dataSource = this.dataService.setParam("filters", this.filters).fetchAll();
        this.updateSubscriptions(append);
    };
    /**
     * Clears all filters stored against this list view.
     *
     * @param clear
     */
    ListViewComponent.prototype.clearFilters = function (clear) {
        this.currentPage = 1;
        this.dataService.setParam("page", this.currentPage);
        // Clear filters here (on the parent)
        this.filters = clear ? JSON.parse(JSON.stringify(this.originalFilters)) : this.filters;
        // Clear filters for `search` component
        if (this.searchComponent) {
            this.searchComponent.clearSearchTerm();
        }
        // Reapply filters
        this.applyFilters();
    };
    /**
     * Syncs all data to child components
     */
    ListViewComponent.prototype.updateSubscriptions = function (append) {
        var _this = this;
        if (append === void 0) { append = false; }
        this.updating = true;
        this.dataSource.subscribe(function (data) {
            _this.loading = false;
            _this.updating = false;
            _this.currentPage = data.meta.page;
            _this.pageCount = data.meta.pageCount;
            _this.initSearchComponent();
            _this.initListRowComponent(data, append);
            _this.initPaginationComponent(data);
            _this.initCounterComponent(data);
            _this.initNotFoundComponent(data);
            _this.initNoResultsComponent(data);
            _this.initClearFiltersComponent();
            _this.initListPreviewComponent();
            _this.initShowMoreComponent(data);
        }, function (error) {
            _this.handleRequestErrorEmitter.emit(error);
        });
    };
    /**
     * Initiates SearchComponent sub component.
     */
    ListViewComponent.prototype.initSearchComponent = function () {
        // Data for `search` component
        if (this.searchComponent) {
            this.searchComponent.searchTerm = this.searchTerm;
        }
    };
    /**
     * Initiates ListRowComponent sub component.
     */
    ListViewComponent.prototype.initListRowComponent = function (data, append) {
        if (append === void 0) { append = false; }
        // Data for `list-row` component
        if (this.listRowComponent) {
            this.listRowComponent.visibleEmitter = this.listPreviewVisibleEmitter;
            this.listRowComponent.dataEmitter = this.activeRowEmitter;
            if (append) {
                this.listRowComponent.rows = this.listRowComponent.rows.concat(data.payload);
            }
            else {
                this.listRowComponent.rows = data.payload;
            }
        }
    };
    /**
     * Initiates PaginationComponent sub component.
     */
    ListViewComponent.prototype.initPaginationComponent = function (data) {
        var _this = this;
        var page = parseInt(data.meta.page);
        var pageCount = parseInt(data.meta.pageCount);
        // Data for `pagination` component
        if (this.paginationComponent) {
            this.paginationComponent.forEach(function (component) {
                component.changePageEmitter = _this.changePageEmitter;
                component.page = page;
                component.pageCount = pageCount;
                component.pages = component.updatePagination();
            });
        }
    };
    /**
     * Initiates CounterComponent sub component.
     */
    ListViewComponent.prototype.initCounterComponent = function (data) {
        var page = parseInt(data.meta.page);
        var perPage = parseInt(data.meta.perPage);
        var totalCount = parseInt(data.meta.totalCount);
        var start = page * perPage - perPage + 1;
        var end = page * perPage;
        // Data for `counter` component
        if (this.counterComponents) {
            this.counterComponents.forEach(function (component) {
                component.start = start;
                component.end = end > totalCount ? totalCount : end;
                component.total = totalCount;
            });
        }
    };
    /**
     * Checks if the current list has been filtered in any way.
     * @returns {boolean}
     */
    ListViewComponent.prototype.isFiltered = function () {
        var noFilters = JSON.stringify(this.filters) === JSON.stringify(this.originalFilters);
        return this.lastSearch.length !== 0 || !noFilters;
    };
    /**
     * Initiates NotFoundComponent sub component.
     */
    ListViewComponent.prototype.initNotFoundComponent = function (data) {
        // Data for `not-found` component
        if (this.notFoundComponent) {
            this.notFoundComponent.show = this.isFiltered() && data.payload.length === 0;
        }
    };
    /**
     * Initiates NoResultsComponent sub component.
     */
    ListViewComponent.prototype.initNoResultsComponent = function (data) {
        // Data for `no-results` component
        if (this.noResultsComponent) {
            this.noResultsComponent.show = data.payload.length === 0 && !this.isFiltered();
        }
    };
    /**
     * Initiates ClearFiltersComponent sub component.
     */
    ListViewComponent.prototype.initClearFiltersComponent = function () {
        var _this = this;
        // Data for `clear-filters` component
        if (this.clearFiltersComponent) {
            this.clearFiltersComponent.forEach(function (component) {
                component.clearFiltersEmitter = _this.clearFiltersEmitter;
            });
        }
    };
    /**
     * Initiates ListPreviewComponent sub component.
     */
    ListViewComponent.prototype.initListPreviewComponent = function () {
        if (this.listPreviewComponent) {
            this.listPreviewComponent.visibleEmitter = this.listPreviewVisibleEmitter;
            this.listPreviewComponent.dataEmitter = this.activeRowEmitter;
            this.listPreviewVisibleEmitter.emit(true);
        }
    };
    /**
     * Initiates ShowMoreComponent sub component.
     * @param data
     */
    ListViewComponent.prototype.initShowMoreComponent = function (data) {
        if (this.showMoreComponent) {
            var page = parseInt(data.meta.page);
            var pageCount = parseInt(data.meta.pageCount);
            var totalCount = parseInt(data.meta.totalCount);
            this.showMoreComponent.loadMoreEmitter = this.loadMoreEmitter;
            this.showMoreComponent.moreResults = page !== pageCount && totalCount !== 0;
        }
    };
    return ListViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "dataService", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "changePageEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "searchTerm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "filtersEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "filterEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "clearFiltersEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "listPreviewVisibleEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "activeRowEmitter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "loadMoreEmitter", void 0);
__decorate([
    core_1.Output("handleRequestError"),
    __metadata("design:type", Object)
], ListViewComponent.prototype, "handleRequestErrorEmitter", void 0);
__decorate([
    core_2.ContentChildren(pagination_component_1.PaginationComponent),
    __metadata("design:type", core_2.QueryList)
], ListViewComponent.prototype, "paginationComponent", void 0);
__decorate([
    core_1.ContentChild(search_component_1.SearchComponent),
    __metadata("design:type", search_component_1.SearchComponent)
], ListViewComponent.prototype, "searchComponent", void 0);
__decorate([
    core_2.ContentChildren(counter_component_1.CounterComponent),
    __metadata("design:type", core_2.QueryList)
], ListViewComponent.prototype, "counterComponents", void 0);
__decorate([
    core_1.ContentChild(list_row_component_1.ListRowComponent),
    __metadata("design:type", list_row_component_1.ListRowComponent)
], ListViewComponent.prototype, "listRowComponent", void 0);
__decorate([
    core_1.ContentChild(list_preview_component_1.ListPreviewComponent),
    __metadata("design:type", list_preview_component_1.ListPreviewComponent)
], ListViewComponent.prototype, "listPreviewComponent", void 0);
__decorate([
    core_1.ContentChild(not_found_component_1.NotFoundComponent),
    __metadata("design:type", not_found_component_1.NotFoundComponent)
], ListViewComponent.prototype, "notFoundComponent", void 0);
__decorate([
    core_1.ContentChild(no_results_component_1.NoResultsComponent),
    __metadata("design:type", no_results_component_1.NoResultsComponent)
], ListViewComponent.prototype, "noResultsComponent", void 0);
__decorate([
    core_2.ContentChildren(clear_filters_component_1.ClearFiltersComponent),
    __metadata("design:type", core_2.QueryList)
], ListViewComponent.prototype, "clearFiltersComponent", void 0);
__decorate([
    core_1.ContentChild(show_more_component_1.ShowMoreComponent),
    __metadata("design:type", show_more_component_1.ShowMoreComponent)
], ListViewComponent.prototype, "showMoreComponent", void 0);
ListViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-list-view",
        templateUrl: "list.view.component.html",
    })
], ListViewComponent);
exports.ListViewComponent = ListViewComponent;
//# sourceMappingURL=list.view.component.js.map