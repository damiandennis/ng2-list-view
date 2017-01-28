import { EventEmitter } from "@angular/core";
export declare class ListRowComponent {
    rows: Array<any>;
    activeRow: any;
    previewHidden: boolean;
    visibleEmitter: EventEmitter<{}>;
    dataEmitter: EventEmitter<{}>;
    togglePreviewVisibility(): void;
    setActiveRow(row: any): void;
    isActiveRow(row: any): boolean;
    isPreviewHidden(): boolean;
}
