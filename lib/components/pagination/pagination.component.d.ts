import { OnChanges } from "@angular/core";
import { EventEmitter } from "@angular/core";
export declare class PaginationComponent implements OnChanges {
    page: number;
    pageCount: number;
    pages: Array<any>;
    changePageEmitter: EventEmitter<any>;
    ngOnChanges(changes: any): void;
    onPrev(): void;
    onNext(): void;
    goToPage(page: number): void;
    updatePagination(): {
        value: string | number;
        isPage: boolean;
        active: boolean;
        disabled: boolean;
    }[];
}
