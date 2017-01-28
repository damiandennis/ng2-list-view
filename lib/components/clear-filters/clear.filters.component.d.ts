import { EventEmitter } from "@angular/core";
import { ApiFilterInterface } from "../../interfaces/api-filter.interface";
export declare class ClearFiltersComponent {
    filter: ApiFilterInterface;
    clearFiltersEmitter: EventEmitter<boolean>;
    clear(): void;
}
