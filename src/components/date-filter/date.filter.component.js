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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DateFilterComponent = (function () {
    function DateFilterComponent() {
        this.value = "";
    }
    DateFilterComponent.prototype.changeValue = function (value) {
        this.value = value;
        this.filterEmitter.emit({
            name: this.name,
            value: value,
            operator: "="
        });
    };
    return DateFilterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DateFilterComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DateFilterComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], DateFilterComponent.prototype, "filterEmitter", void 0);
DateFilterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-date-filter",
        templateUrl: "date-filter.component.html"
    })
], DateFilterComponent);
exports.DateFilterComponent = DateFilterComponent;
//# sourceMappingURL=date-filter.component.js.map