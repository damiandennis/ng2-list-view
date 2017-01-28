import { EventEmitter } from "@angular/core";
export declare class ShowMoreComponent {
    moreResults: Boolean;
    loadMoreEmitter: EventEmitter<{}>;
    loadMore(): void;
}
