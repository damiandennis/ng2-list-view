import {NgModule} from "@angular/core";
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

@NgModule({
    imports: [],
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
        ShowMoreComponent
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
        ShowMoreComponent
    ]
})
export class ListViewModule {}