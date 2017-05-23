import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ClearFiltersComponent} from "./components/clear-filters/clear.filters.component";
import {CounterComponent} from "./components/counter/counter.component";
import {ListPreviewComponent} from "./components/list-preview/list.preview.component";
import {ListRowComponent} from "./components/list-row/list.row.component";
import {ListViewComponent} from "./components/list-view/list.view.component";
import {NoResultsComponent} from "./components/no-results/no.results.component";
import {NotFoundComponent} from "./components/not-found/not.found.component";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {SearchComponent} from "./components/search/search.component";
import {ShowMoreComponent} from "./components/show-more/show.more.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {ICheckDirective} from "./directives/icheck.directive";
import {ListFilterComponent} from "./components/list-filter/list.filter.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DateFilterComponent} from "./components/date-filter/date.filter.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [
        ClearFiltersComponent,
        CounterComponent,
        ListPreviewComponent,
        ListRowComponent,
        ListViewComponent,
        NoResultsComponent,
        NotFoundComponent,
        PaginationComponent,
        SearchComponent,
        ShowMoreComponent,
        ICheckDirective,
        ListFilterComponent,
        DateFilterComponent
    ],
    exports: [
        ClearFiltersComponent,
        CounterComponent,
        ListPreviewComponent,
        ListRowComponent,
        ListViewComponent,
        NoResultsComponent,
        NotFoundComponent,
        PaginationComponent,
        SearchComponent,
        ShowMoreComponent,
        ListFilterComponent,
        DateFilterComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListViewModule {}