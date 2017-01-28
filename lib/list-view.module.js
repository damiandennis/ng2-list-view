"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var clear_filters_component_1 = require("./components/clear-filters/clear.filters.component");
var counter_component_1 = require("./components/counter/counter.component");
var list_preview_component_1 = require("./components/list-preview/list.preview.component");
var list_row_component_1 = require("./components/list-row/list.row.component");
var list_view_component_1 = require("./components/list-view/list.view.component");
var no_results_component_1 = require("./components/no-results/no.results.component");
var not_found_component_1 = require("./components/not-found/not.found.component");
var pagination_component_1 = require("./components/pagination/pagination.component");
var search_component_1 = require("./components/search/search.component");
var show_more_component_1 = require("./components/show-more/show.more.component");
var ListViewModule = (function () {
    function ListViewModule() {
    }
    return ListViewModule;
}());
ListViewModule = __decorate([
    core_1.NgModule({
        imports: [],
        declarations: [
            clear_filters_component_1.ClearFiltersComponent,
            counter_component_1.CounterComponent,
            list_preview_component_1.ListPreviewComponent,
            list_row_component_1.ListRowComponent,
            list_view_component_1.ListViewComponent,
            no_results_component_1.NoResultsComponent,
            not_found_component_1.NotFoundComponent,
            pagination_component_1.PaginationComponent,
            search_component_1.SearchComponent,
            show_more_component_1.ShowMoreComponent
        ],
        exports: [
            clear_filters_component_1.ClearFiltersComponent,
            counter_component_1.CounterComponent,
            list_preview_component_1.ListPreviewComponent,
            list_row_component_1.ListRowComponent,
            list_view_component_1.ListViewComponent,
            no_results_component_1.NoResultsComponent,
            not_found_component_1.NotFoundComponent,
            pagination_component_1.PaginationComponent,
            search_component_1.SearchComponent,
            show_more_component_1.ShowMoreComponent
        ]
    })
], ListViewModule);
exports.ListViewModule = ListViewModule;
//# sourceMappingURL=list-view.module.js.map