import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "c-list-row",
    templateUrl: "list.row.component.html"
})
export class ListRowComponent {

    public rows: Array<any>;
    public activeRow: any;
    @Input() public previewHidden = true;
    @Input() public visibleEmitter = new EventEmitter();
    @Input() public dataEmitter = new EventEmitter();

    togglePreviewVisibility() {
        this.previewHidden = !this.previewHidden;
        this.visibleEmitter.emit(this.previewHidden);
    }

    setActiveRow(row: any) {
        if (!this.isActiveRow(row)) {
            this.activeRow = row;
            this.dataEmitter.emit(row);
            if (this.isPreviewHidden()) {
                this.togglePreviewVisibility();
            }
        } else {
            this.togglePreviewVisibility();
        }
    }

    isActiveRow(row: any) {
        return this.activeRow === row && !this.isPreviewHidden();
    }

    isPreviewHidden() {
        return this.previewHidden;
    }

}
