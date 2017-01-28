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
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var core_4 = require("@angular/core");
var ListPreviewComponent = (function () {
    function ListPreviewComponent() {
        this.hidden = true;
        this.visibleEmitter = new core_3.EventEmitter();
        this.dataEmitter = new core_3.EventEmitter();
    }
    ListPreviewComponent.prototype.closePreview = function () {
        this.visibleEmitter.emit(true);
        this.hidden = true;
    };
    return ListPreviewComponent;
}());
__decorate([
    core_4.HostBinding("class.hidden"),
    __metadata("design:type", Boolean)
], ListPreviewComponent.prototype, "hidden", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Object)
], ListPreviewComponent.prototype, "visibleEmitter", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Object)
], ListPreviewComponent.prototype, "dataEmitter", void 0);
ListPreviewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-list-preview",
        templateUrl: "list.preview.component.html"
    })
], ListPreviewComponent);
exports.ListPreviewComponent = ListPreviewComponent;
//# sourceMappingURL=list.preview.component.js.map