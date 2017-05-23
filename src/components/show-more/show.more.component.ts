import {Component, EventEmitter, Input} from "@angular/core";

@Component({
    selector: "c-show-more",
    templateUrl: "show.more.component.html"
})
export class ShowMoreComponent {
    public moreResults: Boolean = false;
    @Input() public loadMoreEmitter = new EventEmitter();

    public loadMore() {
        this.loadMoreEmitter.emit(true);
    }
}
