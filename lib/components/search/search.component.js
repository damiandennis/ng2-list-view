"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/debounceTime");
var SearchComponent = (function () {
    function SearchComponent() {
        this.searchTerm = new core_1.EventEmitter();
        this.placeholder = "Search";
        this.isCustom = false;
        this.classes = ["form-control"];
        this.searchInputControl = new forms_1.FormControl();
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to and debounce form control, emitting search results
        this.searchInputControl
            .valueChanges
            .debounceTime(500)
            .subscribe(function (term) {
            _this.searchInputControl.setValue(term, { emitEvent: false });
            _this.searchTerm.emit(term);
        });
    };
    SearchComponent.prototype.clearSearchTerm = function (emit) {
        if (emit === void 0) { emit = false; }
        this.searchInputControl.setValue("", { emitEvent: emit });
    };
    return SearchComponent;
}());
__decorate([
    core_1.Output(), core_1.Input(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "searchTerm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "isCustom", void 0);
SearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-search",
        templateUrl: "search.component.html",
        styles: ["\n        :host {\n            position: relative;\n            display: block;\n        }\n        .search-clear {\n            position: absolute;\n            top: 7px;\n            right: 8px;\n        }\n        a {\n            cursor: pointer;\n        }\n    "]
    })
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map