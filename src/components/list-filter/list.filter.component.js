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
var _ = require("lodash");
var icheck_directive_1 = require("../../directives/icheck.directive");
var ListFilterComponent = (function () {
    function ListFilterComponent() {
        this.title = "";
        this.name = "";
        this.items = [];
        this.displayName = "label";
        this.value = "value";
        this.checkedItems = {};
        this.itemsActive = 0;
        this.menuShown = false;
    }
    ListFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        // If data is specified and items is empty fetch and fill.
        if (this.dataService) {
            this.dataService
                .fetchAll()
                .subscribe(function (data) {
                _this.items = data.payload;
            });
        }
    };
    ListFilterComponent.prototype.reset = function () {
        this.itemsActive = 0;
        this.checkedItems = {};
        this.checkboxes.forEach(function (item) {
            item.unCheck();
        });
    };
    /**
     * When a filter is made active or deactivated.
     *
     * @param name The name of the item.
     * @param event The filter returned.
     */
    ListFilterComponent.prototype.rowChecked = function (name, event) {
        var _this = this;
        this.checkedItems[name] = event;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            var value = _.keys(_.pickBy(_this.checkedItems, function (value, key) {
                return value;
            }));
            _this.filterEmitter.emit({
                name: _this.name,
                value: value,
                operator: "IN"
            });
            _this.itemsActive = value.length;
        }, 1000);
    };
    ListFilterComponent.prototype.toggleClickMenu = function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.menuShown = !this.menuShown;
    };
    ListFilterComponent.prototype.closeMenu = function (e) {
        this.menuShown = false;
    };
    ListFilterComponent.prototype.showDropDown = function () {
        return this.menuShown ? "block" : "hide";
    };
    return ListFilterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListFilterComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListFilterComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ListFilterComponent.prototype, "items", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListFilterComponent.prototype, "displayName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListFilterComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListFilterComponent.prototype, "dataService", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListFilterComponent.prototype, "checkedItems", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], ListFilterComponent.prototype, "filterEmitter", void 0);
__decorate([
    core_1.ViewChildren(icheck_directive_1.ICheckDirective),
    __metadata("design:type", core_1.QueryList)
], ListFilterComponent.prototype, "checkboxes", void 0);
ListFilterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-list-filter",
        templateUrl: "list.filter.component.html"
    })
], ListFilterComponent);
exports.ListFilterComponent = ListFilterComponent;
//# sourceMappingURL=list.filter.component.js.map