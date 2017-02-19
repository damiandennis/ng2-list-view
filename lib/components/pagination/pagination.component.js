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
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.page = 1;
        this.pageCount = 1;
        this.pages = [];
    }
    PaginationComponent.prototype.ngOnChanges = function (changes) {
        this.pages = this.updatePagination();
    };
    PaginationComponent.prototype.onPrev = function () {
        this.goToPage(this.page - 1);
    };
    PaginationComponent.prototype.onNext = function () {
        this.goToPage(this.page + 1);
    };
    PaginationComponent.prototype.goToPage = function (page) {
        this.changePageEmitter.emit(page);
    };
    PaginationComponent.prototype.updatePagination = function () {
        var pagesArray = [];
        var currentPage = this.page;
        var pagesCount = this.pageCount;
        var paginationSpan = 2;
        var startPos = 2;
        var endPos = startPos + paginationSpan - 1;
        var middlePos = Math.ceil(paginationSpan / 2);
        // Adjust start and end positions to maintain range and keep current page as active.
        if (currentPage >= startPos + 1) {
            startPos = currentPage - middlePos + 1;
            endPos = startPos + paginationSpan - 1;
            if (endPos + 1 > pagesCount) {
                startPos = pagesCount - paginationSpan;
                endPos = pagesCount - 1;
            }
        }
        /*
         * Extra adjustments in case pagination range is larger than results.
         */
        if (startPos < 2) {
            startPos = 2;
        }
        if (endPos >= pagesCount) {
            endPos = pagesCount - 1;
        }
        if (endPos < startPos) {
            endPos = startPos - 1;
        }
        // Only show pagination when there is more than one page.
        if (pagesCount > 1) {
            /*
             * Create pagination range.
             */
            pagesArray.push({
                value: 1,
                isPage: true,
                active: +currentPage === 1,
                disabled: false
            });
            if (startPos > 2) {
                pagesArray.push({ value: "...", isPage: false, active: false, disabled: true });
            }
            for (var i = startPos; i <= endPos; i++) {
                pagesArray.push({
                    value: i,
                    isPage: true,
                    active: i === +currentPage,
                    disabled: false
                });
            }
            if (endPos + 1 !== +pagesCount) {
                pagesArray.push({ value: "...", isPage: false, active: false, disabled: true });
            }
            pagesArray.push({
                value: pagesCount,
                isPage: true,
                active: +pagesCount === +currentPage,
                disabled: false
            });
        }
        return pagesArray;
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "page", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "pageCount", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_2.EventEmitter)
], PaginationComponent.prototype, "changePageEmitter", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "c-pagination",
        templateUrl: "pagination.component.html"
    })
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map