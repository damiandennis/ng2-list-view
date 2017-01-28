import { EventEmitter } from "@angular/core";
export declare class ListPreviewComponent {
    data: any;
    hidden: boolean;
    visibleEmitter: EventEmitter<{}>;
    dataEmitter: EventEmitter<{}>;
    closePreview(): void;
}
