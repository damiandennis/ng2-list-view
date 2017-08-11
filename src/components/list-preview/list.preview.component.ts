import {Component, ContentChildren, QueryList} from "@angular/core";
import {Input} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {HostBinding} from "@angular/core";
import {ListFormResetDirective} from "../../directives/list-form-reset.directive";

@Component({
    selector: "c-list-preview",
    templateUrl: "list.preview.component.html"
})
export class ListPreviewComponent {

    public _data: any;
    @HostBinding("class.hidden") hidden: boolean = true;

    @Input() public visibleEmitter = new EventEmitter();
    @Input() public dataEmitter = new EventEmitter();
    @ContentChildren(ListFormResetDirective) forms: QueryList<ListFormResetDirective>;

    /**
     * Closes the list preview.
     */
    public closePreview() {
        this.visibleEmitter.emit(true);
        this.hidden = true;
    }

    /**
     * Gets the data.
     *
     * @returns {any}
     */
    public get data() {
        return this._data;
    }

    /**
     * Sets the data.
     *
     * @param data
     */
    public set data(data: any) {
        this._data = data;
        this.forms.forEach((resetFormDir: ListFormResetDirective) => {
            resetFormDir.form.resetForm(data);
        });
    }

    /**
     * Checks whether the user should be prompted to save changes if form is dirty.
     *
     * @returns {boolean}
     */
    public shouldPromptReset() {
        const resets = this.forms.map((resetFormDir: ListFormResetDirective) => {
            return resetFormDir.reset && resetFormDir.form.dirty;
        });
        return resets.indexOf(true) !== -1;
    }

}
