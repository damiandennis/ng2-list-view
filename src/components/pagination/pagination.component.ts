import {Component, Input, OnChanges} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Component({
    selector: "c-pagination",
    templateUrl: "pagination.component.html"
})
export class PaginationComponent implements OnChanges {

    @Input() public type: string = 'buttons';
    @Input() public page: number = 1;
    @Input() public pageCount: number = 1;
    public pages: Array<any> = [];
    public updating = false;

    @Input() public changePageEmitter: EventEmitter<any>;

    ngOnChanges(changes: any) {
        if (this.type === 'buttons') {
            this.pages = this.updatePagination();
        } else {
            let pages = [];
            for (let i = 1; i <= this.pageCount; i++) {
                pages.push(i);
            }
        }

    }

    public onPrev() {
        this.goToPage(this.page - 1);
    }

    public onNext() {
        this.goToPage(this.page + 1);
    }

    public goToPage(page: number) {
        this.updating = true;
        this.changePageEmitter.emit(page);
    }

    public updatePagination() {
        this.updating = false;
        let pagesArray: Array<{value: string|number, isPage: boolean, active: boolean, disabled: boolean}> = [];
        let currentPage = this.page;
        let pagesCount = this.pageCount;
        let paginationSpan = 2;
        let startPos = 2;
        let endPos = startPos + paginationSpan - 1;
        let middlePos = Math.ceil(paginationSpan / 2);

        // Adjust start and end positions to maintain range and keep current page as active.
        if (currentPage >= startPos + 1) {
            startPos = currentPage - middlePos + 1;
            endPos = startPos + paginationSpan - 1;
            if (endPos + 1 > pagesCount) {
                startPos = pagesCount - paginationSpan;
                endPos = pagesCount - 1;
            }
        }

        /*
         * Extra adjustments in case pagination range is larger than results.
         */
        if (startPos < 2) {
            startPos = 2;
        }
        if (endPos >= pagesCount) {
            endPos = pagesCount - 1;
        }
        if (endPos < startPos) {
            endPos = startPos - 1;
        }

        // Only show pagination when there is more than one page.
        if (pagesCount > 1) {

            /*
             * Create pagination range.
             */
            pagesArray.push({
                value: 1,
                isPage: true,
                active: +currentPage === 1,
                disabled: false
            });

            if (startPos > 2) {
                pagesArray.push({value: "...", isPage: false, active: false, disabled: true});
            }
            for (let i = startPos; i <= endPos; i++) {
                pagesArray.push({
                    value: i,
                    isPage: true,
                    active: i === +currentPage,
                    disabled: false
                });
            }
            if (endPos + 1 !== +pagesCount) {
                pagesArray.push({value: "...", isPage: false, active: false, disabled: true});
            }
            pagesArray.push({
                value: pagesCount,
                isPage: true,
                active: +pagesCount === +currentPage,
                disabled: false
            });
        }

        return pagesArray;
    }
}
