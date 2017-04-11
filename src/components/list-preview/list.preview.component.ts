import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {HostBinding} from "@angular/core";

@Component({
    selector: "c-list-preview",
    templateUrl: "list.preview.component.html"
})
export class ListPreviewComponent {

    public data: any;
    @HostBinding("class.hidden") hidden: boolean = true;

    @Input() public visibleEmitter = new EventEmitter();
    @Input() public dataEmitter = new EventEmitter();


    closePreview() {
        this.visibleEmitter.emit(true);
        this.hidden = true;
    }
}
