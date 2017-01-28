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
var CounterComponent = (function () {
    function CounterComponent() {
        this.start = 1;
        this.end = 1;
        this.total = 0;
        this.label = "";
    }
    return CounterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CounterComponent.prototype, "start", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CounterComponent.prototype, "end", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CounterComponent.prototype, "total", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CounterComponent.prototype, "label", void 0);
CounterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-counter",
        templateUrl: "counter.component.html"
    })
], CounterComponent);
exports.CounterComponent = CounterComponent;
//# sourceMappingURL=counter.component.js.map